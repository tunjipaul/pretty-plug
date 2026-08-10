from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_current_admin
from app.core.security import create_access_token, verify_password
from app.db.supabase import get_supabase_admin_client
from app.schemas.auth import AdminUser, LoginRequest, LoginResponse

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    supabase = get_supabase_admin_client()
    response = (
        supabase.table("admin_users")
        .select("id,email,password_hash,full_name,role,is_active")
        .eq("email", payload.email.lower())
        .eq("is_active", True)
        .limit(1)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    user = response.data[0]
    if not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        subject=user["id"],
        extra_claims={"email": user["email"], "role": user["role"]},
    )

    return LoginResponse(
        access_token=access_token,
        user=AdminUser(
            id=user["id"],
            email=user["email"],
            full_name=user.get("full_name"),
            role=user["role"],
        ),
    )


@router.get("/me", response_model=AdminUser)
def me(current_admin=Depends(get_current_admin)):
    return AdminUser(
        id=current_admin["id"],
        email=current_admin["email"],
        full_name=current_admin.get("full_name"),
        role=current_admin["role"],
    )

