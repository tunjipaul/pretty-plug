from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any


class BookingCreate(BaseModel):
    client_name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    service_name: str
    appointment_date: str        # ISO date string e.g. "2026-08-10"
    appointment_time: str        # e.g. "10:30"
    specialist: Optional[str] = None
    status: str = "Pending"
    amount: int = 0
    deposit: int = 0
    selected_add_ons: Optional[List[Any]] = []
    notes: Optional[str] = None


class BookingUpdate(BaseModel):
    client_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    service_name: Optional[str] = None
    appointment_date: Optional[str] = None
    appointment_time: Optional[str] = None
    specialist: Optional[str] = None
    status: Optional[str] = None
    amount: Optional[int] = None
    deposit: Optional[int] = None
    selected_add_ons: Optional[List[Any]] = None
    notes: Optional[str] = None
