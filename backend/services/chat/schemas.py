from pydantic import BaseModel, Field, AliasChoices


class ConversationTurn(BaseModel):
    role: str = Field(validation_alias=AliasChoices('role', 'sender'))
    content: str = Field(validation_alias=AliasChoices('content', 'text'))


class ChatRequest(BaseModel):
    message: str
    history: list[ConversationTurn] = []   # full conversation so far (excluding current message)


class ChatResponse(BaseModel):
    reply: str
