from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "ThePrettyPlug API"
    frontend_url: str = "http://localhost:5173"

    supabase_url: str | None = None
    supabase_publishable_key: str | None = None

    vite_supabase_url: str | None = None
    vite_supabase_publishable_key: str | None = None

    @property
    def resolved_supabase_url(self) -> str:
        url = self.supabase_url or self.vite_supabase_url
        if not url:
            raise RuntimeError("Missing SUPABASE_URL in backend/.env")
        return url

    @property
    def resolved_supabase_key(self) -> str:
        key = self.supabase_publishable_key or self.vite_supabase_publishable_key
        if not key:
            raise RuntimeError("Missing SUPABASE_PUBLISHABLE_KEY in backend/.env")
        return key

    @property
    def allowed_origins(self) -> list[str]:
        return [self.frontend_url]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

