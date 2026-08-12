-- ThePrettyPlug initial Supabase schema
-- Run this in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  full_name text,
  role text not null default 'admin',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  price integer not null default 0,
  duration_minutes integer,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  add_ons jsonb default '[]'::jsonb,
  image_url text,
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists homepage_content (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  title text,
  subtitle text,
  body text,
  image_path text,
  cta_label text,
  cta_url text,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  image_path text not null,
  alt_text text,
  caption text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  service_label text,
  quote text not null,
  rating numeric(2, 1) default 5.0,
  avatar_path text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  question text not null,
  answer text not null,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_email text,
  client_phone text,
  service_id uuid references services(id) on delete set null,
  service_name text,
  appointment_date date,
  appointment_time time,
  status text not null default 'pending',
  total_amount integer not null default 0,
  deposit_amount integer not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique,
  phone text,
  location text,
  notes text,
  preferences jsonb not null default '{}'::jsonb,
  total_spend integer not null default 0,
  visit_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Helpful indexes
create index if not exists services_active_sort_idx on services (is_active, sort_order);
create index if not exists gallery_published_sort_idx on gallery_items (is_published, sort_order);
create index if not exists testimonials_published_sort_idx on testimonials (is_published, sort_order);
create index if not exists faqs_published_sort_idx on faqs (is_published, sort_order);
create index if not exists bookings_status_date_idx on bookings (status, appointment_date);

-- Public read policies can be enabled later if the frontend reads directly from Supabase.
-- For a FastAPI-first backend, keep reads/writes behind FastAPI and use the service role key server-side later.

