from datetime import datetime, timedelta, timezone

import jwt
from fastapi import HTTPException, status

from gateway.config import settings
from services.auth.supabase_client import supabase_anon
from services.auth.schemas import SignupRequest, LoginRequest, TokenResponse


def create_jwt(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=settings.jwt_expiry_hours),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, settings.app_secret_key, algorithm=settings.jwt_algorithm)


def signup(data: SignupRequest) -> TokenResponse:
    try:
        response = supabase_anon.auth.sign_up({
            "email": data.email,
            "password": data.password,
            "options": {"data": {"full_name": data.full_name}}
        })
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    if not response.user:
        raise HTTPException(status_code=400, detail="Signup failed")

    user_id = response.user.id
    token = create_jwt(user_id, data.email)
    return TokenResponse(access_token=token, user_id=user_id, email=data.email)


def login(data: LoginRequest) -> TokenResponse:
    try:
        response = supabase_anon.auth.sign_in_with_password({
            "email": data.email,
            "password": data.password
        })
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not response.user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user_id = response.user.id
    token = create_jwt(user_id, data.email)
    return TokenResponse(access_token=token, user_id=user_id, email=data.email)
