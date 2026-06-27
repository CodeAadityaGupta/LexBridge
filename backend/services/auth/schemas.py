from pydantic import BaseModel, EmailStr, Field, AliasChoices


class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str = Field(validation_alias=AliasChoices('full_name', 'name'))


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str


class UserMeResponse(BaseModel):
    user_id: str
    email: str
