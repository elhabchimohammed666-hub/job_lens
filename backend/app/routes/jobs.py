import uuid

from flask import Blueprint, g, jsonify, request
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request

from app.middleware.auth_middleware import token_required
from app.middleware.role_middleware import roles_required
from app.models.user import User
from app.services import job_service
from app.utils.validators import validate_required_fields

jobs_bp = Blueprint("jobs", __name__)


def _optional_current_user():
    try:
        verify_jwt_in_request(optional=True)
    except Exception:
        return None

    identity = get_jwt_identity()
    if not identity:
        return None

    try:
        return User.query.get(uuid.UUID(identity))
    except (ValueError, TypeError):
        return None


@jobs_bp.route("/jobs", methods=["GET"])
def list_jobs():
    requester = _optional_current_user()

    filters = {
        "search": request.args.get("search"),
        "location": request.args.get("location"),
        "type": request.args.get("type"),
        "level": request.args.get("level"),
        "mine": request.args.get("mine", "").lower() == "true",
    }
    page = request.args.get("page", 1, type=int)
    limit = request.args.get("limit", 20, type=int)

    jobs, total = job_service.list_jobs(filters, page=page, limit=limit, requester=requester)
    pages = (total + limit - 1) // limit if limit else 0

    return jsonify({"jobs": [job.to_dict() for job in jobs], "total": total, "page": page, "pages": pages}), 200


@jobs_bp.route("/jobs/<uuid:job_id>", methods=["GET"])
def get_job(job_id):
    requester = _optional_current_user()
    job = job_service.get_job(job_id, requester=requester)
    if job is None:
        return jsonify({"error": "Job not found"}), 404
    return jsonify({"job": job.to_dict()}), 200


@jobs_bp.route("/jobs", methods=["POST"])
@token_required
@roles_required("manager")
def create_job():
    data = request.get_json(silent=True) or {}
    error = validate_required_fields(data, ["title", "company", "description"])
    if error:
        return jsonify({"error": error}), 400

    job = job_service.create_job(data, manager_id=g.user.id)
    return jsonify({"job": job.to_dict()}), 201


@jobs_bp.route("/jobs/<uuid:job_id>", methods=["PUT"])
@token_required
@roles_required("manager")
def update_job(job_id):
    data = request.get_json(silent=True) or {}
    job = job_service.update_job(job_id, data, manager=g.user)
    return jsonify({"job": job.to_dict()}), 200


@jobs_bp.route("/jobs/<uuid:job_id>", methods=["DELETE"])
@token_required
@roles_required("manager")
def delete_job(job_id):
    job_service.delete_job(job_id, manager=g.user)
    return jsonify({"message": "Job deleted"}), 200
