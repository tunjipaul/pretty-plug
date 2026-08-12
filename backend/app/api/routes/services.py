import re
from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.api.deps import get_current_admin
from app.db.supabase import get_supabase_admin_client
from app.schemas.cms import ServiceCreate, ServiceUpdate

router = APIRouter()


def _safe_execute(action_func, payload_dict: dict):
    working_data = dict(payload_dict)
    for _ in range(5):
        try:
            return action_func(working_data)
        except Exception as exc:
            err_str = str(exc)
            if "PGRST204" in err_str or "Could not find the" in err_str:
                match = re.search(r"Could not find the '([^']+)' column", err_str)
                if match:
                    missing_col = match.group(1)
                    if missing_col in working_data:
                        working_data.pop(missing_col)
                        continue
            raise exc


@router.get("")
def list_services():
    try:
        supabase = get_supabase_admin_client()
        response = (
            supabase.table("services")
            .select("*")
            .order("sort_order")
            .execute()
        )
        return {"data": response.data}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not fetch services: {exc}",
        ) from exc


@router.post("", dependencies=[Depends(get_current_admin)])
def create_service(payload: ServiceCreate):
    supabase = get_supabase_admin_client()
    try:
        data = payload.dict()
        response = _safe_execute(lambda d: supabase.table("services").insert(d).execute(), data)
        return {"data": response.data[0]}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not create service: {exc}",
        )


@router.put("/{service_id}", dependencies=[Depends(get_current_admin)])
def update_service(service_id: str, payload: ServiceUpdate):
    supabase = get_supabase_admin_client()
    try:
        data = payload.dict(exclude_unset=True)
        response = _safe_execute(
            lambda d: supabase.table("services").update(d).eq("id", service_id).execute(),
            data,
        )
        if not response.data:
            raise HTTPException(status_code=404, detail="Service not found")
        return {"data": response.data[0]}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not update service: {exc}",
        )


@router.delete("/{service_id}", dependencies=[Depends(get_current_admin)])
def delete_service(service_id: str):
    supabase = get_supabase_admin_client()
    try:
        response = supabase.table("services").delete().eq("id", service_id).execute()
        return {"message": "Deleted successfully"}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not delete service: {exc}",
        )


