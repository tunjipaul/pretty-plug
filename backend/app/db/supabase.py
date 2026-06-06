from supabase import Client, create_client

from app.core.config import settings


def get_supabase_client() -> Client:
    return create_client(
        settings.resolved_supabase_url,
        settings.resolved_supabase_key,
    )

