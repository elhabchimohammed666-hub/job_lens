from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Instantiated here (unbound) and attached to the app inside create_app()
# to avoid circular imports between app/__init__.py and the models/routes.
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()

# In-memory JWT revocation set, consulted by jwt.token_in_blocklist_loader in
# app/__init__.py. Good enough for single-process dev; swap for a DB/Redis
# backed blocklist before running multiple worker processes in production.
revoked_token_jtis = set()


_supabase_client = None


def get_supabase_client():
    """Lazily build a Supabase client authenticated with the service role key.

    Used for privileged operations (e.g. Storage uploads to the `resumes`
    bucket) that should bypass Row Level Security. Returns None when
    SUPABASE_URL / SUPABASE_SERVICE_KEY are not configured, so callers must
    handle the "not configured" case (see app/utils/file_upload.py).
    """
    global _supabase_client

    if _supabase_client is not None:
        return _supabase_client

    import os

    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_KEY")
    if not url or not key:
        return None

    from supabase import create_client

    _supabase_client = create_client(url, key)
    return _supabase_client
