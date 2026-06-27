from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from gateway.middleware import jwt_middleware
from services.auth.router import router as auth_router
from services.lawyers.router import router as lawyers_router
from services.chat.router import router as chat_router
from services.email.router import router as email_router

app = FastAPI(
    title="LexBridge API",
    version="1.0.0",
    docs_url="/docs"
)

# CORS — allow React dev server and production domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",         # Vite dev
        "https://lexbridge.vercel.app"   # production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT middleware runs on every request
app.add_middleware(BaseHTTPMiddleware, dispatch=jwt_middleware)

# --- Routers ---
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(lawyers_router, prefix="/lawyers", tags=["Lawyers"])
app.include_router(chat_router, prefix="/chat", tags=["Chat"])
app.include_router(email_router, prefix="/email", tags=["Email"])


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred"}
    )
