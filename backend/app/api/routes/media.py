import os
import uuid
import logging
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, Request
from app.api.deps import get_current_admin
from app.db.supabase import get_supabase_admin_client

logger = logging.getLogger(__name__)

router = APIRouter()
BUCKET_NAME = "media"


@router.post("/upload", dependencies=[Depends(get_current_admin)])
async def upload_file(request: Request, file: UploadFile = File(...)):
    supabase = get_supabase_admin_client()
    
    filename = file.filename or "upload.jpg"
    file_extension = filename.split(".")[-1] if "." in filename else "jpg"
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    content = await file.read()
    
    # 1. Attempt upload to Supabase Storage
    try:
        # Auto-create bucket if missing
        try:
            supabase.storage.create_bucket(BUCKET_NAME, options={"public": True})
        except Exception:
            pass

        content_type = file.content_type or "image/jpeg"
        
        try:
            supabase.storage.from_(BUCKET_NAME).upload(
                path=unique_filename,
                file=content,
                file_options={"content-type": content_type}
            )
        except Exception as e:
            # Fallback upload without file_options
            supabase.storage.from_(BUCKET_NAME).upload(
                path=unique_filename,
                file=content
            )
        
        url_response = supabase.storage.from_(BUCKET_NAME).get_public_url(unique_filename)

        url_str = None
        if isinstance(url_response, str):
            url_str = url_response
        elif isinstance(url_response, dict):
            for key in ("publicUrl", "publicURL", "public_url", "url"):
                if key in url_response and isinstance(url_response[key], str):
                    url_str = url_response[key]
                    break
                
        if not url_str:
            from app.core.config import settings
            base_url = settings.resolved_supabase_url.rstrip("/")
            url_str = f"{base_url}/storage/v1/object/public/{BUCKET_NAME}/{unique_filename}"

        return {"url": url_str}

    except Exception as exc:
        logger.warning(f"Supabase storage upload failed ({exc}). Using local uploads fallback.")

    # 2. Local uploads fallback if Supabase Storage is unavailable or missing bucket
    try:
        uploads_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "uploads"))
        os.makedirs(uploads_dir, exist_ok=True)
        file_path = os.path.join(uploads_dir, unique_filename)
        
        with open(file_path, "wb") as f:
            f.write(content)

        base_url_str = str(request.base_url).rstrip("/")
        local_url = f"{base_url_str}/uploads/{unique_filename}"
        return {"url": local_url}
    except Exception as local_exc:
        logger.error(f"Local storage fallback failed: {local_exc}")
        raise HTTPException(
            status_code=500,
            detail=f"Image upload failed: {local_exc}",
        )

