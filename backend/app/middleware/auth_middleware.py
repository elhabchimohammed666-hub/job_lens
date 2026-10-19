import uuid
from functools import wraps

from flask import g, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request

from app.models.user import User


def token_required(f):
    """Verify the JWT on the incoming request and attach the current user to flask.g.user."""

    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
        except Exception as exc:
            return jsonify({"error": "Invalid or missing token", "details": str(exc)}), 401

        identity = get_jwt_identity()
        try:
            user_id = uuid.UUID(identity)
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid token subject"}), 401

        user = User.query.get(user_id)
        if user is None:
            return jsonify({"error": "User not found"}), 401

        g.user = user
        return f(*args, **kwargs)

    return decorated
