from fastapi import Request, HTTPException, status
import jwt
from gateway.config import settings

# Routes that do NOT require a token
PUBLIC_ROUTES = [
    "/auth/signup",
    "/auth/login",
    "/docs",
    "/openapi.json",
    "/health",
]


async def jwt_middleware(request: Request, call_next):
    if any(request.url.path.startswith(route) for route in PUBLIC_ROUTES):
        return await call_next(request)

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header"
        )

    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(
            token,
            settings.app_secret_key,
            algorithms=[settings.jwt_algorithm]
        )
        request.state.user_id = payload.get("sub")
        request.state.user_email = payload.get("email")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    return await call_next(request)
