-- ==============================================================================
-- REALITY AI — Supabase Production Authentication & Profiles Migration (Secured)
-- File: supabase/migrations/20261124_create_profiles_and_auth_triggers.sql
-- Description: Creates user profiles table, automatic auth signup trigger,
--              updated_at trigger, immutable field protection trigger,
--              and clean non-recursive Row Level Security (RLS) policies.
-- ==============================================================================

-- 1. Create Profiles Table linked to Supabase auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  account_type text not null check (account_type in ('buyer', 'seller')),
  role text not null default 'buyer' check (role in ('buyer', 'seller', 'admin')),
  avatar_url text,
  agency_name text,
  is_verified boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

-- Index frequently queried columns
create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_account_type on public.profiles(account_type);

-- 2. Updated At Auto-timestamp Trigger (with secure search_path)
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- 3. Field Protection Trigger (Prevents direct privilege escalation on UPDATE)
create or replace function public.protect_profile_fields()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Prevent standard client updates from modifying immutable/privileged columns
  if (new.id is distinct from old.id) then
    raise exception 'Cannot modify profile id';
  end if;

  if (new.email is distinct from old.email) then
    raise exception 'Email cannot be modified directly on profiles table';
  end if;

  if (new.role is distinct from old.role) then
    raise exception 'Permission denied: Cannot modify role';
  end if;

  if (new.account_type is distinct from old.account_type) then
    raise exception 'Permission denied: Cannot modify account_type';
  end if;

  if (new.is_verified is distinct from old.is_verified) then
    raise exception 'Permission denied: Cannot modify is_verified status';
  end if;

  -- Ensure created_at remains unchanged
  new.created_at := old.created_at;

  return new;
end;
$$;

drop trigger if exists protect_profiles_privileges on public.profiles;
create trigger protect_profiles_privileges
  before update on public.profiles
  for each row
  execute function public.protect_profile_fields();

-- 4. Automatic Profile Creation on auth.users Signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  user_full_name text;
  user_account_type text;
  user_phone text;
  assigned_role text;
begin
  -- Extract and sanitize user metadata
  user_full_name := coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1));
  user_account_type := coalesce(new.raw_user_meta_data->>'account_type', 'buyer');
  user_phone := new.raw_user_meta_data->>'phone';

  -- Strictly normalize account_type to 'buyer' or 'seller' (never trust arbitrary input)
  if user_account_type not in ('buyer', 'seller') then
    user_account_type := 'buyer';
  end if;

  -- Role strictly mirrors account_type for new signups; 'admin' can NEVER be set via public signup
  assigned_role := user_account_type;

  insert into public.profiles (
    id,
    full_name,
    email,
    phone,
    account_type,
    role,
    is_verified,
    created_at,
    updated_at
  ) values (
    new.id,
    user_full_name,
    new.email,
    user_phone,
    user_account_type,
    assigned_role,
    false,
    timezone('utc'::text, now()),
    timezone('utc'::text, now())
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    phone = coalesce(excluded.phone, public.profiles.phone),
    updated_at = timezone('utc'::text, now());

  return new;
end;
$$;

-- Trigger attached to auth.users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Drop any previous or recursive policies
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Service role has full access" on public.profiles;

-- Policy 1: Non-recursive SELECT policy (Users can view their own profile)
create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Policy 2: Non-recursive UPDATE policy (Users can update permitted profile fields of their own row)
create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 6. Helper for manual Admin promotion (Execute manually in Supabase SQL editor):
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@realityai.estate';
