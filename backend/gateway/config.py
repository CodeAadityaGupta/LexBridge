from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_expiry_hours: int = 72

    supabase_url: str
    supabase_anon_key: str
    supabase_service_key: str

    gemini_api_key: str
    resend_api_key: str
    email_from: str

    chroma_persist_dir: str = "./data/chromadb"
    chroma_collection_name: str = "legal_cases"

    class Config:
        env_file = ".env"


settings = Settings()
