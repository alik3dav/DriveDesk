-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Clients / tenants
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Client memberships and roles
create table if not exists public.client_roles (
  user_id uuid references auth.users on delete cascade,
  client_id uuid references public.clients on delete cascade,
  role text not null check (role in ('admin', 'manager', 'viewer')),
  created_at timestamptz not null default now(),
  primary key (user_id, client_id)
);

-- Optional profile metadata per user
create table if not exists public.user_profile (
  user_id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Subscription / trial tracking
create table if not exists public.subscriptions (
  client_id uuid primary key references public.clients on delete cascade,
  status text not null default 'trial' check (status in ('trial', 'active', 'inactive')),
  trial_started_at timestamptz not null default now(),
  trial_expires_at timestamptz not null default (now() + interval '90 days'),
  trial_extended_by interval not null default interval '0 days',
  locked boolean not null default false,
  updated_at timestamptz not null default now()
);

-- Vehicles table
create table if not exists public.vehicles (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients on delete cascade,
  plate text not null,
  make text not null,
  model text not null,
  vehicle_year int not null,
  vin text unique,
  odometer numeric not null default 0,
  status text not null default 'ok',
  notes text,
  last_service_at date,
  next_service_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Maintenance check types
create table if not exists public.check_types (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients on delete cascade,
  name text not null,
  description text,
  default_frequency_days int,
  default_frequency_km int,
  created_at timestamptz not null default now(),
  unique (client_id, name)
);

-- Maintenance check plans per vehicle
create table if not exists public.check_plans (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients on delete cascade,
  vehicle_id uuid not null references public.vehicles on delete cascade,
  check_type_id uuid not null references public.check_types on delete cascade,
  frequency_days int,
  frequency_km int,
  next_due_at date,
  next_due_km numeric,
  status text not null default 'ok',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Individual maintenance logs
create table if not exists public.check_logs (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients on delete cascade,
  check_plan_id uuid not null references public.check_plans on delete cascade,
  vehicle_id uuid not null references public.vehicles on delete cascade,
  check_type_id uuid not null references public.check_types on delete cascade,
  performed_at date not null,
  odometer numeric,
  status text not null default 'ok',
  notes text,
  attachment_url text,
  created_at timestamptz not null default now()
);

-- Files metadata (stored in Supabase storage bucket)
create table if not exists public.vehicle_files (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients on delete cascade,
  vehicle_id uuid not null references public.vehicles on delete cascade,
  name text not null,
  storage_path text not null,
  file_type text,
  file_size int,
  uploaded_by uuid references auth.users,
  uploaded_at timestamptz not null default now()
);

-- Derived profile view for convenience
create or replace view public.profiles as
select
  au.id,
  au.email,
  cr.client_id,
  cr.role,
  p.full_name,
  p.phone,
  s.status as subscription_status,
  s.trial_expires_at
from auth.users au
join public.client_roles cr on cr.user_id = au.id
left join public.subscriptions s on s.client_id = cr.client_id
left join public.user_profile p on p.user_id = au.id; -- optional custom table

-- Helper function returning client ids for current auth user
create or replace function public.auth_client_ids()
returns setof uuid
language sql
security definer
stable
set search_path = public
as $$
  select client_id from public.client_roles where user_id = auth.uid();
$$;

-- Simplified function returning the primary client id (assumes one tenant per user)
create or replace function public.auth_current_client_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select client_id from public.client_roles where user_id = auth.uid() limit 1;
$$;

-- RLS setup
alter table public.clients enable row level security;
alter table public.client_roles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.vehicles enable row level security;
alter table public.check_types enable row level security;
alter table public.check_plans enable row level security;
alter table public.check_logs enable row level security;
alter table public.vehicle_files enable row level security;
alter table public.user_profile enable row level security;

-- Policies ensure users only see records tied to their client memberships
create policy "Clients readable by members" on public.clients
  for select using (id = any (select public.auth_client_ids()));

create policy "Client roles manageable by admins" on public.client_roles
  using (client_id = any (select public.auth_client_ids()))
  with check (
    client_id = any (select public.auth_client_ids())
  );

create policy "Subscriptions per tenant" on public.subscriptions
  for all using (client_id = any (select public.auth_client_ids()))
  with check (client_id = any (select public.auth_client_ids()));

create policy "Vehicles per tenant" on public.vehicles
  for all using (client_id = any (select public.auth_client_ids()))
  with check (client_id = public.auth_current_client_id());

create policy "Check types per tenant" on public.check_types
  for all using (client_id = any (select public.auth_client_ids()))
  with check (client_id = public.auth_current_client_id());

create policy "Check plans per tenant" on public.check_plans
  for all using (client_id = any (select public.auth_client_ids()))
  with check (client_id = public.auth_current_client_id());

create policy "Check logs per tenant" on public.check_logs
  for all using (client_id = any (select public.auth_client_ids()))
  with check (client_id = public.auth_current_client_id());

create policy "Files per tenant" on public.vehicle_files
  for all using (client_id = any (select public.auth_client_ids()))
  with check (client_id = public.auth_current_client_id());

create policy "Profile editable by owner" on public.user_profile
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Auto-manage timestamps
create or replace function public.touch_updated_at()
returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_clients_updated_at before update on public.clients
for each row execute function public.touch_updated_at();

create trigger set_vehicles_updated_at before update on public.vehicles
for each row execute function public.touch_updated_at();

create trigger set_check_plans_updated_at before update on public.check_plans
for each row execute function public.touch_updated_at();

create trigger set_subscriptions_updated_at before update on public.subscriptions
for each row execute function public.touch_updated_at();

create trigger set_user_profile_updated_at before update on public.user_profile
for each row execute function public.touch_updated_at();

-- Automatically create subscription record on new client
create or replace function public.create_subscription_for_client()
returns trigger
language plpgsql as $$
begin
  insert into public.subscriptions (client_id)
  values (new.id)
  on conflict (client_id) do nothing;
  return new;
end;
$$;

create trigger create_subscription_after_client
after insert on public.clients
for each row execute function public.create_subscription_for_client();

-- Trial extension helper
create or replace function public.extend_trial(p_client_id uuid, p_days int)
returns void
language plpgsql
security definer
as $$
begin
  update public.subscriptions
    set trial_expires_at = trial_expires_at + (p_days || ' days')::interval,
        trial_extended_by = trial_extended_by + (p_days || ' days')::interval,
        updated_at = now()
  where client_id = p_client_id;
end;
$$;

-- Lock subscriptions once trial expired
create or replace function public.enforce_trial_lock()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'trial' and new.trial_expires_at < now() then
    new.locked = true;
  end if;
  return new;
end;
$$;

create trigger subscriptions_trial_lock before insert or update on public.subscriptions
for each row execute function public.enforce_trial_lock();
