from fastapi import APIRouter, Request
from services.email.schemas import BookingRequest, BookingResponse
from services.email import controller

router = APIRouter()


@router.post("/booking", response_model=BookingResponse)
def book_consultation(data: BookingRequest, request: Request):
    user_id = getattr(request.state, "user_id", None)
    return controller.send_booking_emails(data, user_id=user_id)
