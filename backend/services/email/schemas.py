from pydantic import BaseModel, EmailStr, Field, AliasChoices
from datetime import datetime
from uuid import UUID


class BookingRequest(BaseModel):
    lawyer_id: UUID = Field(validation_alias=AliasChoices('lawyer_id', 'lawyerId'))
    client_name: str = Field(validation_alias=AliasChoices('client_name', 'name'))
    client_email: EmailStr = Field(validation_alias=AliasChoices('client_email', 'email'))
    client_phone: str = Field(validation_alias=AliasChoices('client_phone', 'phone'))
    case_type: str = Field(validation_alias=AliasChoices('case_type', 'issueType'))
    case_brief: str = Field(validation_alias=AliasChoices('case_brief', 'description'))
    preferred_datetime: datetime = Field(validation_alias=AliasChoices('preferred_datetime', 'dateTime'))


class BookingResponse(BaseModel):
    booking_id: str
    message: str
