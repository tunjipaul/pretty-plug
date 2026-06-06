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
```

The current config also accepts `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

