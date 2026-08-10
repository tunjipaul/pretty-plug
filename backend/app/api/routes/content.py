import time
from threading import Lock

from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_current_admin
from app.db.supabase import get_supabase_admin_client
from app.schemas.content import ContentPayload

router = APIRouter()
SETTINGS_KEY = "homepage_hero"
DEFAULT_CONTENT = {
    "hero": {
        "eyebrow": "Abeokuta Luxury Suite",
        "headline": "Best Nails for Best Moments",
        "highlight": "Best Moments",
        "body": (
            "Loved by beauty minimalists and curated for the meticulous. "
            "Step into an era of editorial beauty where every finish is personal."
        ),
        "primaryCta": "Book Appointment",
        "secondaryCta": "View Portfolio",
    },
    "trustMetrics": {
        "items": [
            {"value": "500+", "label": "Happy Clients"},
            {"value": "3+", "label": "Years Excellence"},
            {"value": "5", "label": "Star Reviews"},
            {"value": "1", "label": "Certified Master"},
        ]
    },
}

_CACHE_LOCK = Lock()
_cached_content: dict | None = None
_cached_content_expires_at = 0
_CACHE_TTL_SECONDS = 60


def _invalidate_content_cache() -> None:
    global _cached_content, _cached_content_expires_at
    with _CACHE_LOCK:
        _cached_content = None
        _cached_content_expires_at = 0


def _fetch_content_from_db() -> dict:
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("site_settings")
            .select("setting_value")
            .eq("setting_key", SETTINGS_KEY)
            .limit(1)
            .execute()
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not fetch homepage content: {exc}",
        ) from exc

    if not response.data:
        return DEFAULT_CONTENT

    return response.data[0]["setting_value"]


def get_content_from_cache() -> dict:
    global _cached_content, _cached_content_expires_at
    now = time.time()
    with _CACHE_LOCK:
        if _cached_content is not None and now < _cached_content_expires_at:
            return _cached_content

    content = _fetch_content_from_db()
    with _CACHE_LOCK:
        _cached_content = content
        _cached_content_expires_at = now + _CACHE_TTL_SECONDS
    return content


@router.get("")
def get_content():
    content = get_content_from_cache()
    return {"data": content}


@router.put("", dependencies=[Depends(get_current_admin)])
def update_content(payload: ContentPayload):
    supabase = get_supabase_admin_client()
    data_to_save = payload.dict()
    try:
        response = (
            supabase.table("site_settings")
            .update({"setting_value": data_to_save})
            .eq("setting_key", SETTINGS_KEY)
            .execute()
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not update homepage content: {exc}",
        ) from exc

    if not response.data:
        try:
            insert_response = (
                supabase.table("site_settings")
                .insert(
                    {
                        "setting_key": SETTINGS_KEY,
                        "setting_value": data_to_save,
                    }
                )
                .execute()
            )
            _invalidate_content_cache()
            return {"data": insert_response.data[0]["setting_value"]}
        except Exception as exc:
            raise HTTPException(
                status_code=500,
                detail=f"Could not insert homepage content: {exc}",
            ) from exc

    _invalidate_content_cache()
    return {"data": response.data[0]["setting_value"]}
