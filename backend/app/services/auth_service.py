from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash, generate_password_hash

from app.extensions import db, revoked_token_jtis
from app.models.user import VALID_ROLES, User
from app.utils.errors import ConflictError, ValidationError


def register_user(full_name, email, password, role="candidate"):
    if role not in VALID_ROLES:
        raise ValidationError(f"role must be one of {VALID_ROLES}")

    if User.query.filter_by(email=email).first():
        raise ConflictError("A user with this email already exists")

    user = User(
        full_name=full_name,
        email=email,
        password_hash=generate_password_hash(password),
        role=role,
    )
    db.session.add(user)
    db.session.commit()
    return user


def authenticate_user(email, password):
    user = User.query.filter_by(email=email).first()
    if user is None or not check_password_hash(user.password_hash, password):
        return None
    return user


def generate_access_token(user):
    return create_access_token(identity=str(user.id), additional_claims={"role": user.role})


def revoke_token(jti):
    revoked_token_jtis.add(jti)
