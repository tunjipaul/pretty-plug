from supabase import Client, create_client

from app.core.config import settings

_supabase_client: Client | None = None
_supabase_admin_client: Client | None = None


def get_supabase_client() -> Client:
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = create_client(
            settings.resolved_supabase_url,
            settings.resolved_supabase_key,
        )
    return _supabase_client


def get_supabase_admin_client() -> Client:
    global _supabase_admin_client
    if _supabase_admin_client is None:
        _supabase_admin_client = create_client(
            settings.resolved_supabase_url,
            settings.resolved_supabase_service_role_key,
        )
    return _supabase_admin_client
