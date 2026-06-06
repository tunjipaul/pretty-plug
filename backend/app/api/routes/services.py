from fastapi import APIRouter, HTTPException

from app.db.supabase import get_supabase_client

router = APIRouter()


@router.get("")
def list_services():
    try:
        supabase = get_supabase_client()
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

