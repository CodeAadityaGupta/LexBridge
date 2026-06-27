"""
Usage: python -m services.chat.rag.ingest
Run once (from the backend/ directory) to populate ChromaDB with case documents and IPC dataset.
Re-running is safe — it clears the collection first to avoid duplicates.
"""

import csv
import uuid
from pathlib import Path
from sentence_transformers import SentenceTransformer
from services.chat.rag.chroma_client import get_collection

CORPUS_DIR = Path("./data/rag_corpus")
CSV_PATH = Path("./fir_dataset.csv")
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


def format_csv_row(row: dict) -> str:
    url = row.get("URL", "")
    section_name = url.split("/")[-1].replace("-", " ").upper() if url else "IPC SECTION"
    offense = row.get("Offense", "").strip()
    punishment = row.get("Punishment", "").strip()
    cognizable = row.get("Cognizable", "").strip()
    bailable = row.get("Bailable", "").strip()
    court = row.get("Court", "").strip()
    description = row.get("Description", "").strip()
    
    parts = []
    if section_name:
        parts.append(section_name)
    if offense:
        parts.append(f"Offense: {offense}")
    if punishment:
        parts.append(f"Punishment: {punishment}")
    if cognizable:
        parts.append(f"Cognizable: {cognizable}")
    if bailable:
        parts.append(f"Bailable: {bailable}")
    if court:
        parts.append(f"Court: {court}")
    if description:
        # If description is very long, it's already structured, so we just include it
        parts.append(f"Details:\n{description}")
        
    return "\n".join(parts)


def ingest():
    collection = get_collection()

    # Clear existing data to avoid duplicates on re-run
    existing = collection.count()
    if existing > 0:
        print(f"Clearing {existing} existing chunks before re-ingesting...")
        collection.delete(where={"source": {"$ne": "__never_matches__"}})

    all_ids, all_docs, all_embeddings, all_metas = [], [], [], []

    # 1. Ingest text files
    txt_files = list(CORPUS_DIR.glob("*.txt"))
    for filepath in txt_files:
        text = filepath.read_text(encoding="utf-8")
        chunks = chunk_text(text)
        print(f"Embedding {len(chunks)} chunks from {filepath.name}...")
        embeddings = model.encode(chunks, show_progress_bar=False).tolist()

        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            all_ids.append(str(uuid.uuid4()))
            all_docs.append(chunk)
            all_embeddings.append(embedding)
            all_metas.append({"source": filepath.stem, "chunk_index": i})

    # 2. Ingest CSV dataset
    if CSV_PATH.exists():
        print(f"Found IPC dataset at {CSV_PATH.name}. Processing...")
        csv_docs = []
        csv_metas = []
        seen_urls = set()
        
        with open(CSV_PATH, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                url = row.get("URL", "")
                if not url or url in seen_urls:
                    continue
                seen_urls.add(url)
                
                doc_text = format_csv_row(row)
                csv_docs.append(doc_text)
                csv_metas.append({
                    "source": "fir_dataset",
                    "url": url,
                    "section": url.split("/")[-1]
                })
        
        if csv_docs:
            print(f"Embedding {len(csv_docs)} unique sections from IPC dataset...")
            embeddings = model.encode(csv_docs, show_progress_bar=False).tolist()
            for i, (doc, embedding, meta) in enumerate(zip(csv_docs, embeddings, csv_metas)):
                all_ids.append(str(uuid.uuid4()))
                all_docs.append(doc)
                all_embeddings.append(embedding)
                all_metas.append(meta)
    else:
        print(f"Warning: IPC dataset not found at {CSV_PATH}. Skipping CSV ingestion.")

    # 3. Add all to ChromaDB in batch
    if all_ids:
        # ChromaDB allows adding in batches if payload is large, but for ~1000 items, adding in one go is fine.
        # However, to be extra safe, we can add in batches of 500
        batch_size = 500
        for idx in range(0, len(all_ids), batch_size):
            collection.add(
                ids=all_ids[idx:idx+batch_size],
                documents=all_docs[idx:idx+batch_size],
                embeddings=all_embeddings[idx:idx+batch_size],
                metadatas=all_metas[idx:idx+batch_size],
            )
        print(f"\nSuccessfully ingested {len(all_ids)} total items into ChromaDB.")
    else:
        print("No content to ingest.")


if __name__ == "__main__":
    ingest()
