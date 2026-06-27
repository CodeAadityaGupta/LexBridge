from supabase import create_client, Client
from gateway.config import settings

# Anon client — used for auth operations (login, signup)
supabase_anon: Client = create_client(
    settings.supabase_url,
    settings.supabase_anon_key
)

# Service client — bypasses RLS, used for bookings and admin reads
supabase_service: Client = create_client(
    settings.supabase_url,
    settings.supabase_service_key
)
