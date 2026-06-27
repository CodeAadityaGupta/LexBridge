from fastapi import APIRouter, Request

from services.chat.schemas import ChatRequest, ChatResponse
from services.chat import controller

router = APIRouter()


@router.post("/message", response_model=ChatResponse)
def send_message(data: ChatRequest, request: Request):
    # request.state.user_id is available for logging if needed (set by JWT middleware)
    return controller.chat(data)
