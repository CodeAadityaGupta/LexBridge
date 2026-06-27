from services.chat.schemas import ChatRequest, ChatResponse
from services.chat.gemini_client import get_bot_response


def chat(data: ChatRequest) -> ChatResponse:
    # Convert Pydantic models to plain dicts for gemini_client
    history = [turn.model_dump() for turn in data.history]
    reply = get_bot_response(data.message, history)
    return ChatResponse(reply=reply)
