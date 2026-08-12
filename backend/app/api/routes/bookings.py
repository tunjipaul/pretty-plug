from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_current_admin
from app.db.supabase import get_supabase_admin_client
from app.schemas.bookings import BookingCreate, BookingUpdate

router = APIRouter()


@router.get("")
def list_bookings():
    """List all bookings ordered by appointment date descending. Public read."""
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("bookings")
            .select("*")
            .order("appointment_date", desc=True)
            .order("appointment_time", desc=True)
            .execute()
        )
        return {"data": response.data}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not fetch bookings: {exc}",
        )


@router.post("")
def create_booking(payload: BookingCreate):
    """Create a new booking. Public endpoint allowing customer bookings."""
    supabase = get_supabase_admin_client()
    data = payload.dict()
    try:
        response = supabase.table("bookings").insert(data).execute()
        if response.data:
            return {"data": response.data[0]}
    except Exception as exc:
        # Fallback: if selected_add_ons is not a table column in Supabase, format it into notes
        try:
            fallback_data = {k: v for k, v in data.items() if k != "selected_add_ons"}
            if data.get("selected_add_ons"):
                addon_text = ", ".join([a.get("name", "") if isinstance(a, dict) else str(a) for a in data["selected_add_ons"]])
                fallback_data["notes"] = f"Add-ons: {addon_text}. " + (fallback_data.get("notes") or "")
            response = supabase.table("bookings").insert(fallback_data).execute()
            if response.data:
                return {"data": response.data[0]}
        except Exception as fallback_exc:
            raise HTTPException(
                status_code=500,
                detail=f"Could not create booking: {exc} | Fallback: {fallback_exc}",
            )
    return {"data": data}


@router.put("/{booking_id}", dependencies=[Depends(get_current_admin)])
def update_booking(booking_id: str, payload: BookingUpdate):
    """Update a booking. Requires admin auth."""
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("bookings")
            .update(payload.dict(exclude_unset=True))
            .eq("id", booking_id)
            .execute()
        )
        if not response.data:
            raise HTTPException(status_code=404, detail="Booking not found")
        return {"data": response.data[0]}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not update booking: {exc}",
        )


@router.delete("/{booking_id}", dependencies=[Depends(get_current_admin)])
def delete_booking(booking_id: str):
    """Delete a booking. Requires admin auth."""
    supabase = get_supabase_admin_client()
    try:
        supabase.table("bookings").delete().eq("id", booking_id).execute()
        return {"message": "Deleted successfully"}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not delete booking: {exc}",
        )
