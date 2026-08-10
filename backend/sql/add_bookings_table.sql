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
    appointment_time time not null,
    specialist       text,
    status           text not null default 'Pending',
    amount           integer not null default 0,
    deposit          integer not null default 0,
    notes            text,
    created_at       timestamptz not null default now(),
    updated_at       timestamptz not null default now()
);

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
create policy "service role full access"
    on public.bookings
    for all
    using (true)
    with check (true);
