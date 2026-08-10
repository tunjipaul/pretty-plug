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
    jwt_secret_key: str = "change-this-dev-secret"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24

    supabase_url: str | None = None
    supabase_publishable_key: str | None = None
    supabase_service_role_key: str | None = None

    vite_supabase_url: str | None = None
    vite_supabase_publishable_key: str | None = None

    first_admin_email: str | None = None
    first_admin_password: str | None = None
    first_admin_name: str = "Admin User"

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
    def resolved_supabase_service_role_key(self) -> str:
        if not self.supabase_service_role_key:
            raise RuntimeError("Missing SUPABASE_SERVICE_ROLE_KEY in backend/.env")
        return self.supabase_service_role_key

    @property
    def allowed_origins(self) -> list[str]:
        origins = [self.frontend_url]
        # Add common local variations
        if "localhost" in self.frontend_url:
            origins.append(self.frontend_url.replace("localhost", "127.0.0.1"))
        return origins


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
