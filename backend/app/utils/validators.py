import re

EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def validate_required_fields(data, required_fields):
    """Return an error message string if any required field is missing/empty, else None."""
    missing = [field for field in required_fields if not data.get(field)]
    if missing:
        return f"Missing required field(s): {', '.join(missing)}"
    return None


def validate_email(email):
    return bool(EMAIL_REGEX.match(email or ""))


def validate_password_strength(password, min_length=8):
    return bool(password) and len(password) >= min_length
