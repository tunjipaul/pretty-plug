from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Any

from app.api.deps import get_current_admin
from app.api.routes.content import SETTINGS_KEY, _invalidate_content_cache
from app.db.supabase import get_supabase_admin_client

router = APIRouter()


class SettingUpdate(BaseModel):
    value: Any


@router.get("/{key}")
def get_setting(key: str):
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("site_settings")
            .select("setting_value")
            .eq("setting_key", key)
            .limit(1)
            .execute()
        )
        if response.data:
            return {"data": response.data[0]["setting_value"]}
        return {"data": {}}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not fetch setting {key}: {exc}",
        )


@router.put("/{key}", dependencies=[Depends(get_current_admin)])
def update_setting(key: str, payload: SettingUpdate):
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("site_settings")
            .upsert({
                "setting_key": key,
                "setting_value": payload.value,
                "updated_at": "now()"
            }, on_conflict="setting_key")
            .execute()
        )
        if key == SETTINGS_KEY:
            _invalidate_content_cache()
        return {"data": response.data[0]["setting_value"]}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not update setting {key}: {exc}",
        )
