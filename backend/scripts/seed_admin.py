from app.core.config import settings
from app.core.security import hash_password
from app.db.supabase import get_supabase_admin_client


def main():
    if not settings.first_admin_email or not settings.first_admin_password:
        raise RuntimeError(
            "Set FIRST_ADMIN_EMAIL and FIRST_ADMIN_PASSWORD in backend/.env",
        )

    email = settings.first_admin_email.lower()
    supabase = get_supabase_admin_client()

    existing = (
        supabase.table("admin_users")
        .select("id,email")
        .eq("email", email)
        .limit(1)
        .execute()
    )

    try:
        password_hash = hash_password(settings.first_admin_password)
    except ValueError as exc:
        raise RuntimeError(
            "FIRST_ADMIN_PASSWORD is too long. Use a strong password with "
            "72 bytes or fewer.",
        ) from exc

    payload = {
        "email": email,
        "password_hash": password_hash,
        "full_name": settings.first_admin_name,
        "role": "admin",
        "is_active": True,
    }

    try:
        if existing.data:
            admin_id = existing.data[0]["id"]
            supabase.table("admin_users").update(payload).eq("id", admin_id).execute()
            print(f"Updated admin user: {email}")
            return

        supabase.table("admin_users").insert(payload).execute()
        print(f"Created admin user: {email}")
    except Exception as exc:
        print(f"Error seeding admin: {exc}")
        if "RLS" in str(exc) or "42501" in str(exc):
            print("\nTIP: This looks like an RLS issue. Ensure SUPABASE_SERVICE_ROLE_KEY is correctly set in backend/.env.")
        raise


if __name__ == "__main__":
    main()
