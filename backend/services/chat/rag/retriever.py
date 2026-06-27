from sentence_transformers import SentenceTransformer

from services.chat.rag.chroma_client import get_collection

_model = None


def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


def retrieve(query: str, top_k: int = 4) -> list[str]:
    """
    Embed the query, search ChromaDB, return top-k document chunks.
    """
    model = get_model()
    query_embedding = model.encode([query]).tolist()[0]
    collection = get_collection()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        include=["documents"],
    )
    return results["documents"][0]  # list of strings
