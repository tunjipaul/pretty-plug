import uuid
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from app.api.deps import get_current_admin
from app.db.supabase import get_supabase_admin_client

router = APIRouter()
BUCKET_NAME = "media"


@router.post("/upload", dependencies=[Depends(get_current_admin)])
async def upload_file(file: UploadFile = File(...)):
    supabase = get_supabase_admin_client()
    
    # Generate a unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    
    try:
        content = await file.read()
        # Ensure bucket exists (usually done in Supabase dashboard)
        # supabase.storage.create_bucket(BUCKET_NAME) 
        
        response = supabase.storage.from_(BUCKET_NAME).upload(
            path=unique_filename,
            file=content,
            file_options={"content-type": file.content_type}
        )
        
        # Get public URL (supabase client may return a dict or a string)
        url_response = supabase.storage.from_(BUCKET_NAME).get_public_url(unique_filename)

        # Normalize to a string URL if possible
        url_str = None
        try:
            if isinstance(url_response, dict):
                # common keys used by different clients
                for key in ("publicUrl", "publicURL", "public_url", "url"):
                    if key in url_response and isinstance(url_response[key], str):
                        url_str = url_response[key]
                        break
                # fallback: take first string-like value
                if url_str is None:
                    for v in url_response.values():
                        if isinstance(v, str) and v.startswith("http"):
                            url_str = v
                            break
            elif isinstance(url_response, str):
                url_str = url_response
        except Exception:
            url_str = None

        # As a last resort, attempt to build a public URL using the known pattern
        if not url_str:
            try:
                from app.core.config import settings
                base_url = settings.resolved_supabase_url.rstrip("/")
                url_str = f"{base_url}/storage/v1/object/public/{BUCKET_NAME}/{unique_filename}"
            except Exception:
                url_str = None

        return {"url": url_str}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {exc}",
        )
