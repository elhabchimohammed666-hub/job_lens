from functools import wraps

from flask import g, jsonify


def roles_required(*allowed_roles):
    """Restrict a route to users whose g.user.role is in allowed_roles.

    Must be applied after @token_required so flask.g.user is already set.
    """

    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            user = getattr(g, "user", None)
            if user is None:
                return jsonify({"error": "Authentication required"}), 401

            if user.role not in allowed_roles:
                return jsonify({"error": "Insufficient permissions"}), 403

            return f(*args, **kwargs)

        return decorated

    return decorator
