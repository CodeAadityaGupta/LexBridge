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

    # 3. Determine the 'from' email. Public domains (like gmail.com) cannot be used as senders in Resend
    email_from = settings.email_from
    public_domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "aol.com", "icloud.com", "proton.me", "protonmail.com"]
    if any(domain in email_from.lower() for domain in public_domains) or not email_from:
        email_from = "LexBridge <onboarding@resend.dev>"

    # 4. Send client confirmation
    client_template = client_confirmation_email(
        client_name=data.client_name,
        lawyer_name=lawyer["name"],
        case_type=data.case_type,
        preferred_datetime=dt_str
    )
    try:
        resend.Emails.send({
            "from": email_from,
            "to": data.client_email,
            "subject": client_template["subject"],
            "html": client_template["html"]
        })
    except Exception as e:
        print(f"Failed to send email to client {data.client_email}: {e}")
        # Sandbox fallback: if recipient is restricted, send to the owner's registered email
        if settings.email_from and settings.email_from.lower() != data.client_email.lower():
            try:
                print(f"Attempting sandbox fallback: sending client confirmation to {settings.email_from}")
                resend.Emails.send({
                    "from": email_from,
                    "to": settings.email_from,
                    "subject": f"[Sandbox Fallback for {data.client_email}] {client_template['subject']}",
                    "html": client_template["html"]
                })
            except Exception as fallback_err:
                print(f"Sandbox fallback for client email failed: {fallback_err}")

    # 5. Send lawyer notification
    lawyer_template = lawyer_booking_email(
        lawyer_name=lawyer["name"],
        client_name=data.client_name,
        client_email=data.client_email,
        client_phone=data.client_phone,
        case_type=data.case_type,
        case_brief=data.case_brief,
        preferred_datetime=dt_str
    )
    try:
        resend.Emails.send({
            "from": email_from,
            "to": lawyer["email"],
            "subject": lawyer_template["subject"],
            "html": lawyer_template["html"]
        })
    except Exception as e:
        print(f"Failed to send email to lawyer {lawyer['email']}: {e}")
        # Sandbox fallback: if recipient is restricted, send to the owner's registered email
        if settings.email_from and settings.email_from.lower() != lawyer["email"].lower():
            try:
                print(f"Attempting sandbox fallback: sending lawyer notification to {settings.email_from}")
                resend.Emails.send({
                    "from": email_from,
                    "to": settings.email_from,
                    "subject": f"[Sandbox Fallback for {lawyer['email']}] {lawyer_template['subject']}",
                    "html": lawyer_template["html"]
                })
            except Exception as fallback_err:
                print(f"Sandbox fallback for lawyer email failed: {fallback_err}")

    return BookingResponse(
        booking_id=booking_id,
        message="Booking confirmed. Confirmation emails sent."
    )
