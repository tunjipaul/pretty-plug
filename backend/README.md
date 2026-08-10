# ThePrettyPlug Backend

FastAPI backend for the ThePrettyPlug CMS, bookings, clients, and services.

## Setup

Create and activate your virtual environment, then install dependencies:

```bash
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn app.main:app --reload
```

Default local API:

```text
http://127.0.0.1:8000
```

## Environment

Use `backend/.env`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_backend_only_service_role_key
```

The backend requires the Supabase service role key for server-side writes to `site_settings`. The config also accepts `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

## Homepage Content Storage

Homepage hero content is now persisted in Supabase using the `site_settings` table with the `setting_key` value `homepage_hero`.

If the row does not exist yet, the backend will create it automatically on first read.

