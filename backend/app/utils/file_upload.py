import os
import uuid

from flask import current_app
from werkzeug.utils import secure_filename

from app.extensions import get_supabase_client

ALLOWED_EXTENSIONS = {"pdf", "doc", "docx"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def save_resume(file_storage):
    """Store an uploaded resume and return its URL/path.

    Uploads to the Supabase Storage bucket configured via
    SUPABASE_RESUME_BUCKET when Supabase credentials are set; otherwise
    falls back to local disk storage under UPLOAD_FOLDER for local dev.
    """
    if not file_storage or file_storage.filename == "":
        raise ValueError("No file provided")

    if not allowed_file(file_storage.filename):
        raise ValueError(f"Unsupported file type. Allowed: {', '.join(sorted(ALLOWED_EXTENSIONS))}")

    filename = secure_filename(file_storage.filename)
    unique_name = f"{uuid.uuid4().hex}_{filename}"

    supabase = get_supabase_client()
    if supabase is not None:
        return _upload_to_supabase(supabase, unique_name, file_storage)

    return _save_locally(unique_name, file_storage)


def _upload_to_supabase(supabase, unique_name, file_storage):
    bucket = current_app.config.get("SUPABASE_RESUME_BUCKET", "resumes")
    content_type = file_storage.mimetype or "application/octet-stream"

    try:
        supabase.storage.from_(bucket).upload(
            unique_name, file_storage.read(), {"content-type": content_type}
        )
    except Exception as exc:  # noqa: BLE001 - surface upload failures to the caller
        raise ValueError(f"Failed to upload resume to Supabase Storage: {exc}") from exc

    return supabase.storage.from_(bucket).get_public_url(unique_name)


def _save_locally(unique_name, file_storage):
    upload_folder = current_app.config.get("UPLOAD_FOLDER", "uploads")
    os.makedirs(upload_folder, exist_ok=True)

    filepath = os.path.join(upload_folder, unique_name)
    file_storage.save(filepath)
    return filepath
