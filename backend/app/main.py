from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, bookings, content, health, services, testimonials, faqs, gallery, media, settings as site_settings
from app.core.config import settings

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(services.router, prefix="/api/services", tags=["services"])
app.include_router(content.router, prefix="/api/content", tags=["content"])
app.include_router(testimonials.router, prefix="/api/testimonials", tags=["testimonials"])
app.include_router(faqs.router, prefix="/api/faqs", tags=["faqs"])
app.include_router(gallery.router, prefix="/api/gallery", tags=["gallery"])
app.include_router(media.router, prefix="/api/media", tags=["media"])
app.include_router(site_settings.router, prefix="/api/settings", tags=["settings"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["bookings"])


@app.get("/")
def root():
    return {"name": settings.app_name, "status": "ok"}
