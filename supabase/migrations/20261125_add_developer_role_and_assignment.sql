-- ==============================================================================
-- REALITY AI — Database Migration: Support 'developer' Role & Hardened Role Assignment
-- File: supabase/migrations/20261125_add_developer_role_and_assignment.sql
-- Description:
--   1. Updates public.profiles.role check constraint to permit ('buyer', 'seller', 'developer', 'admin').
--   2. Preserves public.profiles.account_type check constraint as ('buyer', 'seller').
--   3. Hardens protect_profile_fields() trigger:
--      - Unconditionally denies role modification for all client-facing roles (authenticated, anon).
--      - Forbids direct ad-hoc UPDATE to role column even for privileged roles.
--      - Permits role modification ONLY when executing inside public.admin_assign_role().
--   4. Hardens public.admin_assign_role():
--      - Strict input validation on target_email (format, non-null) and new_role.
--      - Strict profile lookup validation with clear error handling.
--      - Explicitly revoked from public, anon, and authenticated roles (not exposed as RPC).
--      - Granted strictly to postgres (DBA / SQL Editor) and service_role.
--   5. Refreshes trigger binding on public.profiles for idempotent deployment.
--   6. Retains standard operator procedure using public.admin_assign_role().
--
-- DO NOT EXECUTE AUTOMATICALLY AGAINST LIVE DATABASE.
-- Review and execute manually in the Supabase Dashboard SQL Editor as postgres/service_role.
-- ==============================================================================

-- 1. UPDATE ROLE CHECK CONSTRAINT
-- The original table definition in 20261124_create_profiles_and_auth_triggers.sql defined:
--   role text not null default 'buyer' check (role in ('buyer', 'seller', 'admin'))
-- which PostgreSQL assigns under the standard constraint name 'profiles_role_check'.
--
-- Drop strictly the 'profiles_role_check' constraint and re-add it with 'developer' included.
-- This avoids broad pattern matches and guarantees that unrelated constraints remain untouched.
alter table public.profiles drop constraint if exists profiles_role_check;

alter table public.profiles add constraint profiles_role_check
  check (role in ('buyer', 'seller', 'developer', 'admin'));

-- Note: public.profiles.account_type check constraint REMAINS STRICTLY:
-- check (account_type in ('buyer', 'seller'))
-- account_type identifies marketplace profile classification.
-- role defines authorization and platform privileges.


-- 2. HARDENED PROFILE FIELD PROTECTION TRIGGER
-- Prevents self-promotion, privilege escalation, and direct client modification of:
-- id, email, role, account_type, and is_verified.
--
-- Security guarantees:
-- a) Authenticated/anon end users connecting through PostgREST/client API are
--    UNCONDITIONALLY BLOCKED from modifying the 'role' column.
-- b) Direct ad-hoc UPDATE statements to 'role' are rejected to enforce auditability
--    and ensure role changes occur solely through public.admin_assign_role().

create or replace function public.protect_profile_fields()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Prevent client updates from modifying immutable/privileged columns
  if (new.id is distinct from old.id) then
    raise exception 'Permission denied: Cannot modify profile id';
  end if;

  if (new.email is distinct from old.email) then
    raise exception 'Permission denied: Email cannot be modified directly on profiles table';
  end if;

  if (new.account_type is distinct from old.account_type) then
    raise exception 'Permission denied: Cannot modify account_type';
  end if;

  if (new.is_verified is distinct from old.is_verified) then
    raise exception 'Permission denied: Cannot modify is_verified status';
  end if;

  -- Role modification protection:
  -- 1. Any request originating from standard client roles (authenticated, anon) is unconditionally denied.
  -- 2. Direct ad-hoc updates are denied; role changes must execute within the verified admin_assign_role context.
  if (new.role is distinct from old.role) then
    if (
      coalesce(auth.role(), '') in ('authenticated', 'anon')
      or coalesce(current_setting('reality.role_assignment_active', true), 'false') <> 'true'
    ) then
      raise exception 'Permission denied: Role cannot be modified directly. Use public.admin_assign_role().';
    end if;
  end if;

  -- Ensure created_at remains unchanged
  new.created_at := old.created_at;

  return new;
end;
$$;

-- Ensure trigger is explicitly bound to public.profiles
drop trigger if exists protect_profiles_privileges on public.profiles;
create trigger protect_profiles_privileges
  before update on public.profiles
  for each row
  execute function public.protect_profile_fields();


-- 3. HARDENED ADMINISTRATIVE ROLE-ASSIGNMENT FUNCTION
-- This restricted function provides the single authorized path for assigning
-- roles ('buyer', 'seller', 'developer', 'admin') to an existing user profile.
--
-- Security enforcement:
-- - Validates email format, role legitimacy, and profile existence.
-- - Transaction-local setting 'reality.role_assignment_active' is scoped strictly
--   within this function's execution block and guaranteed reset upon exit or failure.
-- - Execution is completely revoked from public, anon, and authenticated roles.
-- - Cannot be invoked as a client RPC endpoint from the frontend application.

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
  -- 1. Validate target email parameter
  if target_email is null or trim(target_email) = '' then
    raise exception 'Validation error: target_email cannot be null or empty.';
  end if;

  normalized_email := lower(trim(target_email));

  if normalized_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' then
    raise exception 'Validation error: "%" is not a valid email address format.', target_email;
  end if;

  -- 2. Validate new_role parameter
  if new_role is null or trim(new_role) = '' then
    raise exception 'Validation error: new_role cannot be null or empty.';
  end if;

  normalized_role := lower(trim(new_role));

  if normalized_role not in ('buyer', 'seller', 'developer', 'admin') then
    raise exception 'Validation error: Invalid role "%". Allowed roles are: buyer, seller, developer, admin.', new_role;
  end if;

  -- 3. Validate target profile existence in public.profiles
  select id, role into target_user_id, current_user_role
  from public.profiles
  where lower(email) = normalized_email;

  if target_user_id is null then
    raise exception 'Lookup error: Profile with email "%" does not exist in public.profiles.', normalized_email;
  end if;

  -- 4. No-op notice if user already holds the target role
  if current_user_role = normalized_role then
    raise notice 'Notice: Profile "%" already holds the role "%". No update required.', normalized_email, normalized_role;
    return;
  end if;

  -- 5. Perform authorized role update within isolated transaction-scoped context
  begin
    -- Set transaction-local authorization flag (is_local = true)
    perform set_config('reality.role_assignment_active', 'true', true);

    update public.profiles
    set role = normalized_role,
        updated_at = timezone('utc'::text, now())
    where id = target_user_id;

    -- Reset transaction-local authorization flag
    perform set_config('reality.role_assignment_active', 'false', true);
  exception
    when others then
      -- Guarantee flag reset on unexpected error before re-raising exception
      perform set_config('reality.role_assignment_active', 'false', true);
      raise;
  end;
end;
$$;

-- Revoke all execute permissions from client-facing roles (prevents exposure via PostgREST RPC)
revoke all on function public.admin_assign_role(text, text) from public;
revoke all on function public.admin_assign_role(text, text) from anon;
revoke all on function public.admin_assign_role(text, text) from authenticated;

-- Grant execution strictly to administrative roles
grant execute on function public.admin_assign_role(text, text) to postgres;
grant execute on function public.admin_assign_role(text, text) to service_role;


-- ==============================================================================
-- STANDARD OPERATOR PROCEDURE (SUPABASE SQL EDITOR AS POSTGRES / SERVICE ROLE):
-- ==============================================================================
--
-- To assign the 'developer' role to an existing user:
--   SELECT public.admin_assign_role('developer@example.com', 'developer');
--
-- To assign the 'admin' role to an existing user:
--   SELECT public.admin_assign_role('admin@example.com', 'admin');
--
-- To demote/revert a user to 'buyer' or 'seller':
--   SELECT public.admin_assign_role('user@example.com', 'buyer');
--
-- To verify the updated profile role:
--   SELECT id, full_name, email, account_type, role, updated_at
--   FROM public.profiles
--   WHERE email = 'developer@example.com';
-- ==============================================================================
