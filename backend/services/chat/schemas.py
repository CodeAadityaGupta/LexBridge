from pydantic import BaseModel


class ConversationTurn(BaseModel):
    role: str      # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ConversationTurn] = []   # full conversation so far (excluding current message)


class ChatResponse(BaseModel):
    reply: str
