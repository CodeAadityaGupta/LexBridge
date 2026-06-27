"""
Usage: python -m services.chat.rag.ingest
Run once (from the backend/ directory) to populate ChromaDB with case documents.
Re-running is safe — it clears the collection first to avoid duplicates.
"""

import uuid
from pathlib import Path

from sentence_transformers import SentenceTransformer

from services.chat.rag.chroma_client import get_collection

CORPUS_DIR = Path("./data/rag_corpus")
CHUNK_SIZE = 400       # characters per chunk
CHUNK_OVERLAP = 80     # overlap between chunks

model = SentenceTransformer("all-MiniLM-L6-v2")  # small, fast, local


def chunk_text(text: str) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = start + CHUNK_SIZE
        chunks.append(text[start:end].strip())
        start += CHUNK_SIZE - CHUNK_OVERLAP
    return [c for c in chunks if len(c) > 50]  # skip tiny chunks


def ingest():
    collection = get_collection()

    # Clear existing data to avoid duplicates on re-run
    existing = collection.count()
    if existing > 0:
        print(f"Clearing {existing} existing chunks before re-ingesting...")
        collection.delete(where={"source": {"$ne": "__never_matches__"}})

    all_ids, all_docs, all_embeddings, all_metas = [], [], [], []

    txt_files = list(CORPUS_DIR.glob("*.txt"))
    if not txt_files:
        print(f"No .txt files found in {CORPUS_DIR}. Aborting.")
        return

    for filepath in txt_files:
        text = filepath.read_text(encoding="utf-8")
        chunks = chunk_text(text)
        print(f"  Embedding {len(chunks)} chunks from {filepath.name}...")
        embeddings = model.encode(chunks, show_progress_bar=False).tolist()

        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            all_ids.append(str(uuid.uuid4()))
            all_docs.append(chunk)
            all_embeddings.append(embedding)
            all_metas.append({"source": filepath.stem, "chunk_index": i})

    collection.add(
        ids=all_ids,
        documents=all_docs,
        embeddings=all_embeddings,
        metadatas=all_metas,
    )
    print(f"\nIngested {len(all_ids)} chunks from {len(txt_files)} files into ChromaDB.")


if __name__ == "__main__":
    ingest()
