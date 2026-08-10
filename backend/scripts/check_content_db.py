from app.db.supabase import get_supabase_admin_client
from app.api.routes.content import SETTINGS_KEY

def check_db():
    supabase = get_supabase_admin_client()
    try:
        response = supabase.table("site_settings").select("*").eq("setting_key", SETTINGS_KEY).execute()
        print(f"DATABASE CHECK: Rows found: {len(response.data)}")
        for row in response.data:
            print(f"ID: {row['id']}, Key: {row['setting_key']}, Value: {row['setting_value']}")
    except Exception as e:
        print(f"DATABASE CHECK ERROR: {e}")

if __name__ == "__main__":
    check_db()
