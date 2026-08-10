from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.api.deps import get_current_admin
from app.db.supabase import get_supabase_admin_client
from app.schemas.cms import FAQCreate, FAQUpdate

router = APIRouter()


@router.get("")
def list_faqs():
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("faqs")
            .select("*")
            .order("sort_order")
            .execute()
        )
        return {"data": response.data}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not fetch FAQs: {exc}",
        )


@router.post("", dependencies=[Depends(get_current_admin)])
def create_faq(payload: FAQCreate):
    supabase = get_supabase_admin_client()
    try:
        response = supabase.table("faqs").insert(payload.dict()).execute()
        return {"data": response.data[0]}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not create FAQ: {exc}",
        )


@router.put("/{faq_id}", dependencies=[Depends(get_current_admin)])
def update_faq(faq_id: str, payload: FAQUpdate):
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("faqs")
            .update(payload.dict(exclude_unset=True))
            .eq("id", faq_id)
            .execute()
        )
        if not response.data:
            raise HTTPException(status_code=404, detail="FAQ not found")
        return {"data": response.data[0]}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not update FAQ: {exc}",
        )


@router.delete("/{faq_id}", dependencies=[Depends(get_current_admin)])
def delete_faq(faq_id: str):
    supabase = get_supabase_admin_client()
    try:
        response = supabase.table("faqs").delete().eq("id", faq_id).execute()
        return {"message": "Deleted successfully"}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not delete FAQ: {exc}",
        )
