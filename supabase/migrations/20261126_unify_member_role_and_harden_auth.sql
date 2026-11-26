-- ==============================================================================
-- REALITY AI — Migration: Unify 'member' Role & Harden Auth Security + RBAC
-- File: supabase/migrations/20261126_unify_member_role_and_harden_auth.sql
-- Description:
--   1. Expands public.profiles.role and public.profiles.account_type check constraints
--      to support unified 'member' alongside ('buyer', 'seller', 'developer', 'admin').
--   2. Updates public.handle_new_user() trigger so Email and Google OAuth signups
--      reliably populate full_name and avatar_url, defaulting new users safely to 'buyer'/'member'.
--   3. Updates public.protect_profile_fields() as SECURITY INVOKER so:
--      - Standard client/API sessions (anon, authenticated) can NEVER alter role,
--        account_type, email, id, or is_verified.
--      - Supabase Dashboard Table Editor & SQL Editor (postgres/supabase_admin) and
--        public.admin_assign_role() can cleanly assign 'buyer', 'member', 'developer', or 'admin'.
--   4. Revokes unnecessary PUBLIC/anon/authenticated execute permissions on trigger helpers
--      and optimizes RLS policies using (select auth.uid()).
-- ==============================================================================

-- 1. Expand check constraints for unified Member architecture + RBAC roles
alter table public.profiles drop constraint if exists profiles_account_type_check;
alter table public.profiles add constraint profiles_account_type_check
  check (account_type in ('member', 'buyer', 'seller'));

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('member', 'buyer', 'seller', 'developer', 'admin'));

alter table public.profiles
  alter column role set default 'member';

-- 2. Harden handle_new_user() for Email & Google OAuth signups
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
  user_avatar_url text;
begin
  user_full_name := coalesce(
    nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(new.raw_user_meta_data->>'name'), ''),
    split_part(coalesce(new.email, ''), '@', 1),
    'Reality Member'
  );

  user_account_type := lower(coalesce(new.raw_user_meta_data->>'account_type', 'member'));
  if user_account_type not in ('member', 'buyer', 'seller') then
    user_account_type := 'member';
  end if;

  user_phone := nullif(trim(new.raw_user_meta_data->>'phone'), '');
  user_avatar_url := coalesce(
    nullif(trim(new.raw_user_meta_data->>'avatar_url'), ''),
    nullif(trim(new.raw_user_meta_data->>'picture'), '')
  );

  -- Public signups ALWAYS start as standard 'member'; elevated roles
  -- ('developer', 'admin') can only be granted by a project admin.
  insert into public.profiles (
    id,
    full_name,
    email,
    phone,
    account_type,
    role,
    avatar_url,
    is_verified,
    created_at,
    updated_at
  ) values (
    new.id,
    user_full_name,
    new.email,
    user_phone,
    user_account_type,
    'member',
    user_avatar_url,
    (new.email_confirmed_at is not null),
    timezone('utc'::text, now()),
    timezone('utc'::text, now())
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(nullif(public.profiles.full_name, ''), excluded.full_name),
    phone = coalesce(public.profiles.phone, excluded.phone),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
    is_verified = (new.email_confirmed_at is not null),
    updated_at = timezone('utc'::text, now());

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Protect sensitive profile columns against client escalation while permitting Dashboard edits
create or replace function public.protect_profile_fields()
returns trigger
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  is_client_session boolean;
begin
  -- Detect any untrusted browser / PostgREST client request
  is_client_session := (
    current_user in ('anon', 'authenticated', 'authenticator')
    or coalesce(auth.role(), '') in ('anon', 'authenticated')
    or coalesce(nullif(current_setting('request.jwt.claim.role', true), ''), '') in ('anon', 'authenticated')
  );

  if (new.id is distinct from old.id) then
    raise exception 'Permission denied: Cannot modify profile id';
  end if;

  if is_client_session then
    if (new.email is distinct from old.email) then
      raise exception 'Permission denied: Email cannot be modified directly on profiles table';
    end if;

    if (new.account_type is distinct from old.account_type) then
      raise exception 'Permission denied: Cannot modify account_type';
    end if;

    if (new.is_verified is distinct from old.is_verified) then
      raise exception 'Permission denied: Cannot modify is_verified status';
    end if;

    if (new.role is distinct from old.role) then
      raise exception 'Permission denied: Role cannot be modified by client users';
    end if;
  end if;

  if (new.role is not null) then
    new.role := lower(trim(new.role));
  end if;

  new.created_at := old.created_at;
  return new;
end;
$$;

drop trigger if exists protect_profiles_privileges on public.profiles;
create trigger protect_profiles_privileges
  before update on public.profiles
  for each row
  execute function public.protect_profile_fields();

-- 4. Update admin_assign_role() allowed roles list
create or replace function public.admin_assign_role(
  target_email text,
  new_role text
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  normalized_email text;
  normalized_role text;
  target_user_id uuid;
  current_user_role text;
begin
  if target_email is null or trim(target_email) = '' then
    raise exception 'Validation error: target_email cannot be null or empty.';
  end if;

  normalized_email := lower(trim(target_email));

  if normalized_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' then
    raise exception 'Validation error: "%" is not a valid email address format.', target_email;
  end if;

  if new_role is null or trim(new_role) = '' then
    raise exception 'Validation error: new_role cannot be null or empty.';
  end if;

  normalized_role := lower(trim(new_role));

  if normalized_role not in ('member', 'buyer', 'seller', 'developer', 'admin') then
    raise exception 'Validation error: Invalid role "%". Allowed roles are: member, buyer, seller, developer, admin.', new_role;
  end if;

  select id, role into target_user_id, current_user_role
  from public.profiles
  where lower(email) = normalized_email;

  if target_user_id is null then
    raise exception 'Lookup error: Profile with email "%" does not exist in public.profiles.', normalized_email;
  end if;

  if current_user_role = normalized_role then
    raise notice 'Notice: Profile "%" already holds the role "%". No update required.', normalized_email, normalized_role;
    return;
  end if;

  begin
    perform set_config('reality.role_assignment_active', 'true', true);

    update public.profiles
    set role = normalized_role,
        updated_at = timezone('utc'::text, now())
    where id = target_user_id;

    perform set_config('reality.role_assignment_active', 'false', true);
  exception
    when others then
      perform set_config('reality.role_assignment_active', 'false', true);
      raise;
  end;
end;
$$;

-- 5. Lock down execute privileges on SECURITY DEFINER functions (triggers & admin helper)
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.handle_updated_at() from public, anon, authenticated;

revoke all on function public.admin_assign_role(text, text) from public, anon, authenticated;
grant execute on function public.admin_assign_role(text, text) to postgres, service_role;

-- 6. Tighten RLS policies with explicit TO authenticated + cached auth.uid()
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);
