from flask import Blueprint, g, jsonify

from app.middleware.auth_middleware import token_required
from app.middleware.role_middleware import roles_required
from app.services import ai_service

ai_bp = Blueprint("ai", __name__)


@ai_bp.route("/applications/<uuid:application_id>/analysis", methods=["GET"])
@token_required
@roles_required("manager")
def get_analysis(application_id):
    analysis, candidate = ai_service.analyze_application(application_id, requester=g.user)

    return jsonify(
        {
            "score": analysis.score,
            "match_status": analysis.match_status,
            "matched_skills": analysis.matched_skills or [],
            "missing_skills": analysis.missing_skills or [],
            "recommendation": analysis.recommendation,
            "candidate": {
                "name": candidate.full_name,
                "title": candidate.title,
                # location/experience/education aren't captured on the User
                # model yet - populate these once resume parsing is wired up.
                "location": None,
                "experience": None,
                "education": None,
                "bio": candidate.bio,
            },
        }
    ), 200
