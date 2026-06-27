from fastapi import APIRouter, Request

from services.auth.schemas import SignupRequest, LoginRequest, TokenResponse, UserMeResponse
from services.auth import controller

router = APIRouter()


@router.post("/signup", response_model=TokenResponse)
def signup(data: SignupRequest):
    return controller.signup(data)


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    return controller.login(data)


@router.get("/me", response_model=UserMeResponse)
def me(request: Request):
    # request.state is populated by JWT middleware
    return UserMeResponse(
        user_id=request.state.user_id,
        email=request.state.user_email
    )
