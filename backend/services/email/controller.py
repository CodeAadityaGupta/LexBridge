import resend
from fastapi import HTTPException
from gateway.config import settings
from services.email.schemas import BookingRequest, BookingResponse
from services.email.templates import client_confirmation_email, lawyer_booking_email
from services.auth.supabase_client import supabase_service

resend.api_key = settings.resend_api_key


def send_booking_emails(data: BookingRequest, user_id: str = None) -> BookingResponse:
    # 1. Fetch lawyer details
    lawyer_response = (
        supabase_service.table("lawyers")
        .select("name, email")
        .eq("id", str(data.lawyer_id))
        .single()
        .execute()
    )
    if not lawyer_response.data:
        raise HTTPException(status_code=404, detail="Lawyer not found")

    lawyer = lawyer_response.data
    dt_str = data.preferred_datetime.strftime("%d %B %Y at %I:%M %p")

    # 2. Store booking in Supabase
    booking_insert = supabase_service.table("bookings").insert({
        "lawyer_id": str(data.lawyer_id),
        "user_id": user_id,
        "client_name": data.client_name,
        "client_email": data.client_email,
        "client_phone": data.client_phone,
        "case_type": data.case_type,
        "case_brief": data.case_brief,
        "preferred_datetime": data.preferred_datetime.isoformat(),
        "status": "pending"
    }).execute()

    if not booking_insert.data:
        raise HTTPException(status_code=500, detail="Failed to create booking in database")

    booking_id = booking_insert.data[0]["id"]

    # 3. Send client confirmation
    client_template = client_confirmation_email(
        client_name=data.client_name,
        lawyer_name=lawyer["name"],
        case_type=data.case_type,
        preferred_datetime=dt_str
    )
    resend.Emails.send({
        "from": settings.email_from,
        "to": data.client_email,
        "subject": client_template["subject"],
        "html": client_template["html"]
    })

    # 4. Send lawyer notification
    lawyer_template = lawyer_booking_email(
        lawyer_name=lawyer["name"],
        client_name=data.client_name,
        client_email=data.client_email,
        client_phone=data.client_phone,
        case_type=data.case_type,
        case_brief=data.case_brief,
        preferred_datetime=dt_str
    )
    resend.Emails.send({
        "from": settings.email_from,
        "to": lawyer["email"],
        "subject": lawyer_template["subject"],
        "html": lawyer_template["html"]
    })

    return BookingResponse(
        booking_id=booking_id,
        message="Booking confirmed. Confirmation emails sent."
    )
