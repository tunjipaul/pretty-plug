from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.api.deps import get_current_admin
from app.db.supabase import get_supabase_admin_client
from app.schemas.cms import TestimonialCreate, TestimonialUpdate

router = APIRouter()


@router.get("")
def list_testimonials():
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("testimonials")
            .select("*")
            .order("sort_order")
            .execute()
        )
        return {"data": response.data}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not fetch testimonials: {exc}",
        )


@router.post("", dependencies=[Depends(get_current_admin)])
def create_testimonial(payload: TestimonialCreate):
    supabase = get_supabase_admin_client()
    try:
        response = supabase.table("testimonials").insert(payload.dict()).execute()
        return {"data": response.data[0]}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not create testimonial: {exc}",
        )


@router.put("/{testimonial_id}", dependencies=[Depends(get_current_admin)])
def update_testimonial(testimonial_id: str, payload: TestimonialUpdate):
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("testimonials")
            .update(payload.dict(exclude_unset=True))
            .eq("id", testimonial_id)
            .execute()
        )
        if not response.data:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        return {"data": response.data[0]}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not update testimonial: {exc}",
        )


@router.delete("/{testimonial_id}", dependencies=[Depends(get_current_admin)])
def delete_testimonial(testimonial_id: str):
    supabase = get_supabase_admin_client()
    try:
        response = supabase.table("testimonials").delete().eq("id", testimonial_id).execute()
        return {"message": "Deleted successfully"}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not delete testimonial: {exc}",
        )
