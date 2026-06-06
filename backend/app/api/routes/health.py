from fastapi import APIRouter

from app.core.config import settings

router = APIRouter()


@router.get("")
def health_check():
    return {
        "status": "ok",
        "app": settings.app_name,
        "supabase_configured": bool(
            settings.supabase_url
            or settings.vite_supabase_url
        ),
    }

