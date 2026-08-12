-- Migration to add missing columns to services table in Supabase
-- Run this script in your Supabase Dashboard > SQL Editor

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS add_ons jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS image_path text;
