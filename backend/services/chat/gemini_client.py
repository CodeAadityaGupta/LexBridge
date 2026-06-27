from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser

from gateway.config import settings
from services.chat.prompts import chat_prompt
from services.chat.rag.retriever import retrieve

# ---------------------------------------------------------------------------
# LangChain chain: prompt → LLM → string output
# ---------------------------------------------------------------------------
# The chain is built once at module load. It is stateless — conversation
# history is passed in per-request as a list of LangChain message objects.
# ---------------------------------------------------------------------------
_llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key=settings.gemini_api_key,
    temperature=0.3,       # low temperature for factual legal responses
    max_output_tokens=1024,
)

_chain = chat_prompt | _llm | StrOutputParser()


def _build_history(conversation_history: list[dict]) -> list[HumanMessage | AIMessage]:
    """
    Convert the frontend's history format:
        [{"role": "user"|"assistant", "content": "..."}]
    into LangChain message objects for the MessagesPlaceholder.
    """
    messages = []
    for turn in conversation_history:
        if turn["role"] == "user":
            messages.append(HumanMessage(content=turn["content"]))
        else:
            messages.append(AIMessage(content=turn["content"]))
    return messages


def get_bot_response(user_message: str, conversation_history: list[dict]) -> str:
    """
    1. Retrieve top-4 RAG chunks relevant to the user's message.
    2. Format them as the rag_context variable in the system prompt.
    3. Invoke the LangChain chain with history + current message.
    4. Return the plain-text reply.
    """
    # Step 1: RAG retrieval
    context_chunks = retrieve(user_message, top_k=4)
    rag_context = "\n\n---\n\n".join(context_chunks) if context_chunks else "No relevant context found."

    # Step 2: Build LangChain history
    history = _build_history(conversation_history)

    # Step 3: Invoke chain
    reply = _chain.invoke({
        "rag_context": rag_context,
        "history": history,
        "user_message": user_message,
    })

    return reply
