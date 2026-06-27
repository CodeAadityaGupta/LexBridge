def client_confirmation_email(
    client_name: str,
    lawyer_name: str,
    case_type: str,
    preferred_datetime: str
) -> dict:
    return {
        "subject": f"Your consultation with {lawyer_name} is confirmed",
        "html": f"""
        <div style="font-family: Inter, sans-serif; max-width: 560px; margin: auto;">
            <h2 style="color: #2D3A8C;">Consultation Request Received</h2>
            <p>Hi {client_name},</p>
            <p>Your request for a consultation regarding <strong>{case_type}</strong>
               has been sent to <strong>{lawyer_name}</strong>.</p>
            <p>Requested time: <strong>{preferred_datetime}</strong></p>
            <p>The advocate will reach out to you within 24 hours to confirm.</p>
            <hr />
            <p style="color: #6B7280; font-size: 12px;">
                LexBridge is not a law firm. This platform connects you with independent legal professionals.
            </p>
        </div>
        """
    }


def lawyer_booking_email(
    lawyer_name: str,
    client_name: str,
    client_email: str,
    client_phone: str,
    case_type: str,
    case_brief: str,
    preferred_datetime: str
) -> dict:
    return {
        "subject": f"New consultation request from {client_name}",
        "html": f"""
        <div style="font-family: Inter, sans-serif; max-width: 560px; margin: auto;">
            <h2 style="color: #2D3A8C;">New Consultation Request</h2>
            <p>Hi {lawyer_name},</p>
            <p>You have a new consultation request on LexBridge.</p>
            <table style="border-collapse: collapse; width: 100%;">
                <tr><td style="padding: 8px; font-weight: 600;">Client</td>
                    <td style="padding: 8px;">{client_name}</td></tr>
                <tr><td style="padding: 8px; font-weight: 600;">Email</td>
                    <td style="padding: 8px;">{client_email}</td></tr>
                <tr><td style="padding: 8px; font-weight: 600;">Phone</td>
                    <td style="padding: 8px;">{client_phone}</td></tr>
                <tr><td style="padding: 8px; font-weight: 600;">Case Type</td>
                    <td style="padding: 8px;">{case_type}</td></tr>
                <tr><td style="padding: 8px; font-weight: 600;">Preferred Time</td>
                    <td style="padding: 8px;">{preferred_datetime}</td></tr>
            </table>
            <p><strong>Case Brief:</strong></p>
            <p style="background: #F7F8FC; padding: 12px; border-radius: 6px;">{case_brief}</p>
            <p>Please contact the client directly to confirm the appointment.</p>
        </div>
        """
    }
