-- ==============================================================================
-- REALITY AI — Supabase Wishlist Migration
-- File: supabase/migrations/20261127_create_user_wishlists.sql
-- Description: Creates user_wishlists table with RLS and unique constraint to
--              persist wishlist items per authenticated user against user ID.
-- ==============================================================================

create table if not exists public.user_wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id text not null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  constraint user_wishlists_user_property_unique unique (user_id, property_id)
);

-- Index user queries
create index if not exists idx_user_wishlists_user_id on public.user_wishlists(user_id);
create index if not exists idx_user_wishlists_property_id on public.user_wishlists(property_id);

-- Enable RLS
alter table public.user_wishlists enable row level security;

-- Policies
drop policy if exists "Users can view own wishlist" on public.user_wishlists;
create policy "Users can view own wishlist"
  on public.user_wishlists
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert into own wishlist" on public.user_wishlists;
create policy "Users can insert into own wishlist"
  on public.user_wishlists
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete from own wishlist" on public.user_wishlists;
create policy "Users can delete from own wishlist"
  on public.user_wishlists
  for delete
  using (auth.uid() = user_id);
