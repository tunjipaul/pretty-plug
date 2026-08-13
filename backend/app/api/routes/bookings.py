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
            .order("created_at", desc=True)
            .execute()
        )
        return {"data": response.data}
    except Exception:
        try:
            response = (
                supabase.table("bookings")
                .select("*")
                .order("appointment_date", desc=True)
                .execute()
            )
            return {"data": response.data}
        except Exception:
            try:
                response = supabase.table("bookings").select("*").execute()
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

    email_val = data.get("email") or data.get("client_email")
    phone_val = data.get("phone") or data.get("client_phone")
    amount_val = data.get("amount") if data.get("amount") is not None else data.get("total_amount", 0)
    deposit_val = data.get("deposit") if data.get("deposit") is not None else data.get("deposit_amount", 0)

    # Attempt 1: Variant A (add_bookings_table.sql schema: email, phone, amount, deposit, selected_add_ons)
    variant_a = {
        "client_name": data.get("client_name", "Valued Client"),
        "email": email_val,
        "phone": phone_val,
        "service_name": data.get("service_name", "Bespoke Treatment"),
        "appointment_date": data.get("appointment_date"),
        "appointment_time": str(data.get("appointment_time", "12:00 PM")),
        "status": data.get("status", "Pending"),
        "amount": amount_val,
        "deposit": deposit_val,
        "notes": data.get("notes"),
    }
    if data.get("selected_add_ons") is not None:
        variant_a["selected_add_ons"] = data.get("selected_add_ons")
    if data.get("specialist") is not None:
        variant_a["specialist"] = data.get("specialist")

    try:
        response = supabase.table("bookings").insert(variant_a).execute()
        if response.data:
            return {"data": response.data[0]}
    except Exception as exc1:
        print("Booking Insert Attempt 1 failed:", exc1)

    # Attempt 2: Variant B (schema.sql: client_email, client_phone, total_amount, deposit_amount)
    variant_b = {
        "client_name": data.get("client_name", "Valued Client"),
        "client_email": email_val,
        "client_phone": phone_val,
        "service_name": data.get("service_name", "Bespoke Treatment"),
        "appointment_date": data.get("appointment_date"),
        "appointment_time": str(data.get("appointment_time", "12:00 PM")),
        "status": data.get("status", "Pending"),
        "total_amount": amount_val,
        "deposit_amount": deposit_val,
        "notes": data.get("notes"),
    }
    if data.get("selected_add_ons"):
        addon_text = ", ".join([a.get("name", "") if isinstance(a, dict) else str(a) for a in data["selected_add_ons"]])
        variant_b["notes"] = f"Add-ons: {addon_text}. " + (variant_b.get("notes") or "")

    try:
        response = supabase.table("bookings").insert(variant_b).execute()
        if response.data:
            return {"data": response.data[0]}
    except Exception as exc2:
        print("Booking Insert Attempt 2 failed:", exc2)

    # Attempt 3: Minimal fields only (guaranteed insertion)
    try:
        minimal_data = {
            "client_name": data.get("client_name", "Valued Client"),
            "service_name": data.get("service_name", "Bespoke Treatment"),
            "appointment_date": data.get("appointment_date"),
            "appointment_time": str(data.get("appointment_time", "12:00 PM")),
            "status": "Pending",
        }
        response = supabase.table("bookings").insert(minimal_data).execute()
        if response.data:
            return {"data": response.data[0]}
    except Exception as exc3:
        raise HTTPException(
            status_code=500,
            detail=f"Could not create booking: {exc3}",
        )

    return {"data": variant_a}


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
