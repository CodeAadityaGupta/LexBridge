from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class NotableCase(BaseModel):
    title: str
    year: int
    outcome: str      # "Won" | "Settled" | "Ongoing"
    summary: str


class LawyerListItem(BaseModel):
    id: UUID
    name: str
    photo_url: Optional[str]
    city: str
    specialities: list[str]
    consultation_fee: int
    rating: float
    experience_years: int


class LawyerProfile(BaseModel):
    id: UUID
    name: str
    photo_url: Optional[str]
    city: str
    bar_registration: str
    email: str
    experience_years: int
    specialities: list[str]
    about: Optional[str]
    consultation_fee: int
    retainer_min: Optional[int]
    retainer_max: Optional[int]
    notable_cases: list[NotableCase]
    rating: float
