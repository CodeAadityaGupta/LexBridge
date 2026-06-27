from typing import Optional

from fastapi import HTTPException

from services.auth.supabase_client import supabase_service
from services.lawyers.schemas import LawyerListItem, LawyerProfile


def get_lawyers(
    specialty: Optional[str] = None,
    city: Optional[str] = None,
) -> list[LawyerListItem]:
    query = supabase_service.table("lawyers").select(
        "id, name, photo_url, city, specialities, consultation_fee, rating, experience_years"
    )

    # Supabase array contains filter
    if specialty:
        query = query.contains("specialities", [specialty])
    if city:
        query = query.ilike("city", f"%{city}%")

    response = query.order("rating", desc=True).execute()
    return [LawyerListItem(**row) for row in response.data]


def get_lawyer_by_id(lawyer_id: str) -> LawyerProfile:
    response = (
        supabase_service.table("lawyers")
        .select("*")
        .eq("id", lawyer_id)
        .single()
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Lawyer not found")

    data = response.data
    data["notable_cases"] = data.get("notable_cases") or []
    return LawyerProfile(**data)
