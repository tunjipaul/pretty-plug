from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List

from app.api.deps import get_current_admin
from app.db.supabase import get_supabase_admin_client
from app.schemas.cms import GalleryItemCreate, GalleryItemUpdate

router = APIRouter()


@router.get("")
def list_gallery():
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("gallery_items")
            .select("*")
            .order("sort_order")
            .execute()
        )
        return {"data": response.data}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not fetch gallery items: {exc}",
        )


@router.post("", dependencies=[Depends(get_current_admin)])
def create_gallery_item(payload: GalleryItemCreate):
    supabase = get_supabase_admin_client()
    try:
        response = supabase.table("gallery_items").insert(payload.dict()).execute()
        return {"data": response.data[0]}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not create gallery item: {exc}",
        )


@router.put("/{item_id}", dependencies=[Depends(get_current_admin)])
def update_gallery_item(item_id: str, payload: GalleryItemUpdate):
    supabase = get_supabase_admin_client()
    try:
        response = (
            supabase.table("gallery_items")
            .update(payload.dict(exclude_unset=True))
            .eq("id", item_id)
            .execute()
        )
        if not response.data:
            raise HTTPException(status_code=404, detail="Gallery item not found")
        return {"data": response.data[0]}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not update gallery item: {exc}",
        )


@router.delete("/{item_id}", dependencies=[Depends(get_current_admin)])
def delete_gallery_item(item_id: str):
    supabase = get_supabase_admin_client()
    try:
        # fetch item to determine image path
        resp = supabase.table("gallery_items").select("*").eq("id", item_id).limit(1).execute()
        item = resp.data[0] if resp.data else None

        # attempt to remove storage object if present
        if item and item.get("image_path"):
            image_path = item.get("image_path")
            # normalize to string if object
            if isinstance(image_path, dict):
                # try common keys
                for k in ("publicUrl", "publicURL", "public_url", "url"):
                    if k in image_path:
                        image_path = image_path[k]
                        break
            if isinstance(image_path, str):
                # extract storage path: prefer path after bucket name
                try:
                    BUCKET = "media"
                    if "/storage/v1/object/public/" in image_path:
                        # pattern: .../storage/v1/object/public/{bucket}/{path}
                        parts = image_path.split("/storage/v1/object/public/")[-1]
                        # parts starts with {bucket}/{path}
                        if parts.startswith(BUCKET + "/"):
                            storage_key = parts.split(BUCKET + "/", 1)[1]
                        else:
                            storage_key = parts
                    elif BUCKET + "/" in image_path:
                        storage_key = image_path.split(BUCKET + "/", 1)[1]
                    else:
                        # fallback to filename
                        storage_key = image_path.split("/")[-1]

                    try:
                        supabase.storage.from_(BUCKET).remove([storage_key])
                    except Exception:
                        # ignore storage deletion errors
                        pass
                except Exception:
                    pass

        # delete DB row
        response = supabase.table("gallery_items").delete().eq("id", item_id).execute()
        return {"message": "Deleted successfully"}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not delete gallery item: {exc}",
        )


@router.delete("", dependencies=[Depends(get_current_admin)])
def bulk_delete_gallery_items(ids: List[str] = Body(...)):
    supabase = get_supabase_admin_client()
    try:
        # fetch items to remove storage files
        resp = supabase.table("gallery_items").select("*").in_("id", ids).execute()
        items = resp.data or []

        BUCKET = "media"
        for item in items:
            image_path = item.get("image_path")
            if not image_path:
                continue
            if isinstance(image_path, dict):
                for k in ("publicUrl", "publicURL", "public_url", "url"):
                    if k in image_path:
                        image_path = image_path[k]
                        break
            if isinstance(image_path, str):
                try:
                    if "/storage/v1/object/public/" in image_path:
                        parts = image_path.split("/storage/v1/object/public/")[-1]
                        if parts.startswith(BUCKET + "/"):
                            storage_key = parts.split(BUCKET + "/", 1)[1]
                        else:
                            storage_key = parts
                    elif BUCKET + "/" in image_path:
                        storage_key = image_path.split(BUCKET + "/", 1)[1]
                    else:
                        storage_key = image_path.split("/")[-1]
                    try:
                        supabase.storage.from_(BUCKET).remove([storage_key])
                    except Exception:
                        pass
                except Exception:
                    pass

        # delete rows
        supabase.table("gallery_items").delete().in_("id", ids).execute()
        return {"message": "Bulk delete completed", "deleted": len(items)}
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Could not bulk delete gallery items: {exc}",
        )
