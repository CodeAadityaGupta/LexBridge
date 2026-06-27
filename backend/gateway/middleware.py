from fastapi import Request, status
from fastapi.responses import JSONResponse
import jwt
from gateway.config import settings

# Routes that do NOT require a token
PUBLIC_ROUTES = [
    "/api/auth/signup",
    "/api/auth/login",
    "/auth/signup",
    "/auth/login",
    "/docs",
    "/openapi.json",
    "/health",
]


async def jwt_middleware(request: Request, call_next):
    # Preflight OPTIONS requests must bypass JWT check to allow CORS to function
    if request.method == "OPTIONS":
        return await call_next(request)

    if any(request.url.path.startswith(route) for route in PUBLIC_ROUTES):
        return await call_next(request)

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Missing or invalid Authorization header"}
        )

    token = auth_header.split(" ")[1]
    if token in ("null", "undefined", ""):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Missing or invalid Authorization token"}
        )

    try:
        payload = jwt.decode(
            token,
            settings.app_secret_key,
            algorithms=[settings.jwt_algorithm]
        )
        request.state.user_id = payload.get("sub")
        request.state.user_email = payload.get("email")
    except jwt.ExpiredSignatureError:
        return JSONResponse(status_code=401, content={"detail": "Token has expired"})
    except jwt.InvalidTokenError:
        return JSONResponse(status_code=401, content={"detail": "Invalid token"})

    return await call_next(request)

