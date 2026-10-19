from flask import Blueprint, g, jsonify, request
from flask_jwt_extended import get_jwt

from app.middleware.auth_middleware import token_required
from app.services import auth_service
from app.utils.validators import validate_email, validate_password_strength, validate_required_fields

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}
    error = validate_required_fields(data, ["full_name", "email", "password"])
    if error:
        return jsonify({"error": error}), 400
    if not validate_email(data["email"]):
        return jsonify({"error": "Invalid email address"}), 400
    if not validate_password_strength(data["password"]):
        return jsonify({"error": "Password must be at least 8 characters"}), 400

    user = auth_service.register_user(
        full_name=data["full_name"],
        email=data["email"],
        password=data["password"],
        role=data.get("role", "candidate"),
    )
    access_token = auth_service.generate_access_token(user)
    return jsonify({"user": user.to_dict(), "access_token": access_token}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    error = validate_required_fields(data, ["email", "password"])
    if error:
        return jsonify({"error": error}), 400

    user = auth_service.authenticate_user(data["email"], data["password"])
    if user is None:
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = auth_service.generate_access_token(user)
    return jsonify({"user": user.to_dict(), "access_token": access_token}), 200


@auth_bp.route("/me", methods=["GET"])
@token_required
def me():
    return jsonify({"user": g.user.to_dict()}), 200


@auth_bp.route("/logout", methods=["POST"])
@token_required
def logout():
    auth_service.revoke_token(get_jwt()["jti"])
    return jsonify({"message": "Logged out successfully"}), 200
