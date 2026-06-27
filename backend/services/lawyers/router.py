from typing import Optional

from fastapi import APIRouter, Query

from services.lawyers.schemas import LawyerListItem, LawyerProfile
from services.lawyers import controller

router = APIRouter()


@router.get("/", response_model=list[LawyerListItem])
def list_lawyers(
    specialty: Optional[str] = Query(None),
    city: Optional[str] = Query(None),
):
    return controller.get_lawyers(specialty=specialty, city=city)


@router.get("/{lawyer_id}", response_model=LawyerProfile)
def get_lawyer(lawyer_id: str):
    return controller.get_lawyer_by_id(lawyer_id)
