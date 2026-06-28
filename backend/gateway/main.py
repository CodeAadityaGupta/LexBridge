import logging
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from gateway.middleware import jwt_middleware
from services.auth.router import router as auth_router
from services.lawyers.router import router as lawyers_router
from services.chat.router import router as chat_router
from services.email.router import router as email_router

# Configure logging — stdout only.
# NOTE: Do NOT add a FileHandler here; writing log files inside the backend/
# directory triggers uvicorn's WatchFiles reloader in an infinite loop.
import os
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(),
    ]
)
logger = logging.getLogger("gateway")

app = FastAPI(
    title="LexBridge API",
    version="1.0.0",
    docs_url="/docs"
)

# -----------------------------------------------------------------------
# Middleware registration order matters in Starlette/FastAPI:
# add_middleware() calls are applied in LIFO (last-in, first-out) order.
# @app.middleware("http") decorators run BEFORE all add_middleware layers.
#
# Desired execution order (outermost → innermost):
#   CORSMiddleware → JWT middleware → log_requests → route handler
#
# To achieve this we:
#   1. Register log_requests via @app.middleware (runs innermost of the three)
#   2. add_middleware(JWT)  — runs before CORS (added first = executes second)
#   3. add_middleware(CORS) — added last = outermost = runs FIRST on every request
# -----------------------------------------------------------------------

# 1. Request logger — innermost middleware layer
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url.path}")
    try:
        response = await call_next(request)
        logger.info(f"Response status: {response.status_code} for {request.method} {request.url.path}")
        return response
    except Exception as e:
        logger.error(f"Request failed: {request.method} {request.url.path} - Error: {str(e)}", exc_info=True)
        raise e

# 2. JWT middleware — runs after CORS, before the route handler
app.add_middleware(BaseHTTPMiddleware, dispatch=jwt_middleware)

# 3. CORS — added LAST so it is the OUTERMOST layer and handles OPTIONS preflights
#    before JWT middleware ever sees the request.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",         # Vite dev
        "http://localhost:3000",         # Frontend dev (port 3000)
        "https://lexbridge.vercel.app"   # production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(lawyers_router, prefix="/api/lawyers", tags=["Lawyers"])
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
app.include_router(email_router, prefix="/api/email", tags=["Email"])


@app.get("/health")
def health_check():
    return {"status": "ok"}


# Consistent error responses for HTTPExceptions
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.warning(f"HTTP exception on {request.url.path}: status={exc.status_code}, detail={exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


# Consistent error responses for unhandled exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred"}
    )
