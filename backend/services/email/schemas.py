from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID


class BookingRequest(BaseModel):
    lawyer_id: UUID
    client_name: str
    client_email: EmailStr
    client_phone: str
    case_type: str
    case_brief: str
    preferred_datetime: datetime


class BookingResponse(BaseModel):
    booking_id: str
    message: str
