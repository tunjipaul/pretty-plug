-- ============================================================
-- Migration: add_bookings_table.sql
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

create table if not exists public.bookings (
    id               uuid primary key default gen_random_uuid(),
    client_name      text not null,
    email            text,
    phone            text,
    service_name     text not null,
    appointment_date date not null,
    appointment_time text not null,
    specialist       text,
    status           text not null default 'Pending',
    amount           integer not null default 0,
    deposit          integer not null default 0,
    notes            text,
    selected_add_ons jsonb default '[]'::jsonb,
    created_at       timestamptz not null default now(),
    updated_at       timestamptz not null default now()
);

-- Ensure all columns exist on existing tables if already created
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS selected_add_ons jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS service_name text;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS appointment_date date;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS appointment_time text;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS status text DEFAULT 'Pending';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS amount integer DEFAULT 0;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS deposit integer DEFAULT 0;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS notes text;

-- Auto-update updated_at on every row update
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
    before update on public.bookings
    for each row execute function public.set_updated_at();

-- RLS: enable but allow service-role full access (backend uses service role key)
alter table public.bookings enable row level security;

-- Allow the service-role key unrestricted access (used by backend)
drop policy if exists "service role full access" on public.bookings;
create policy "service role full access"
    on public.bookings
    for all
    using (true)
    with check (true);

