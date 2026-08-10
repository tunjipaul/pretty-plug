from app.api.routes.content import DEFAULT_CONTENT, SETTINGS_KEY
from app.db.supabase import get_supabase_admin_client


def seed_homepage_content() -> None:
    supabase = get_supabase_admin_client()
    response = (
        supabase.table("site_settings")
        .select("id")
        .eq("setting_key", SETTINGS_KEY)
        .limit(1)
        .execute()
    )

    if response.data:
        print("Homepage content already seeded.")
        return

    print("Seeding homepage content row...")
    supabase.table("site_settings").insert(
        {"setting_key": SETTINGS_KEY, "setting_value": DEFAULT_CONTENT}
    ).execute()
    print("Homepage content seeded.")


if __name__ == "__main__":
    seed_homepage_content()
