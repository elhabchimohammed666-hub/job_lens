from flask import Blueprint, g, jsonify, request

from app.middleware.auth_middleware import token_required
from app.middleware.role_middleware import roles_required
from app.services import application_service
from app.utils.file_upload import save_resume
from app.utils.validators import validate_required_fields

applications_bp = Blueprint("applications", __name__)


@applications_bp.route("/jobs/<uuid:job_id>/apply", methods=["POST"])
@token_required
@roles_required("candidate")
def apply_to_job(job_id):
    data = request.form or request.get_json(silent=True) or {}

    resume_url = None
    if "resume" in request.files and request.files["resume"].filename:
        try:
            resume_url = save_resume(request.files["resume"])
        except ValueError as exc:
            return jsonify({"error": str(exc)}), 400

    application = application_service.apply_to_job(
        job_id,
        candidate=g.user,
        cover_letter=data.get("cover_letter"),
        resume_url=resume_url,
    )
    return jsonify({"application": application.to_dict()}), 201


@applications_bp.route("/applications", methods=["GET"])
@token_required
@roles_required("candidate")
def list_my_applications():
    applications = application_service.list_applications_for_candidate(g.user.id)
    return jsonify({"applications": [application.to_dict() for application in applications]}), 200


@applications_bp.route("/jobs/<uuid:job_id>/applicants", methods=["GET"])
@token_required
@roles_required("manager")
def list_job_applicants(job_id):
    filters = {
        "match_status": request.args.get("match_status"),
        "search": request.args.get("search"),
    }
    page = request.args.get("page", 1, type=int)
    limit = request.args.get("limit", 20, type=int)

    applicants, total = application_service.list_applicants_for_job(
        job_id, manager=g.user, filters=filters, page=page, limit=limit
    )
    return jsonify(
        {"applicants": [applicant.to_dict() for applicant in applicants], "total": total, "page": page}
    ), 200


@applications_bp.route("/applications/<uuid:application_id>/status", methods=["PATCH"])
@token_required
@roles_required("manager")
def update_status(application_id):
    data = request.get_json(silent=True) or {}
    error = validate_required_fields(data, ["status"])
    if error:
        return jsonify({"error": error}), 400

    application = application_service.update_application_status(application_id, manager=g.user, status=data["status"])
    return jsonify({"application": application.to_dict()}), 200
