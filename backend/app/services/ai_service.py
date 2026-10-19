import os

from app.extensions import db
from app.models.ai_analysis import AIAnalysis
from app.models.application import Application
from app.models.job import Job
from app.models.user import User
from app.utils.errors import ForbiddenError, NotFoundError

AI_API_KEY = os.environ.get("AI_API_KEY")


def compute_match_status(score):
    if score >= 90:
        return "strong_match"
    if score >= 75:
        return "good_match"
    return "requires_review"


def match_skills(required_skills, candidate_text):
    """Naive keyword matching between a job's required skills and candidate text
    (bio/title, or resume text once resume parsing is wired up). Replace with a
    real embedding/LLM-based comparison once AI_API_KEY is configured.
    """
    candidate_text = (candidate_text or "").lower()
    matched, missing = [], []

    for skill in required_skills or []:
        if skill.lower() in candidate_text:
            matched.append({"name": skill, "level": "proficient"})
        else:
            missing.append({"name": skill})

    return matched, missing


def generate_recommendation(score, matched_skills, missing_skills):
    """Placeholder for an LLM-generated recommendation. Wire this to the
    configured AI provider (via AI_API_KEY) to produce a natural-language
    summary instead of the deterministic fallback below.
    """
    if not AI_API_KEY:
        if score >= 90:
            return "Strong alignment with the role's required skills. Recommended to advance to interview."
        if score >= 75:
            return "Good overall fit with some skill gaps. Worth a closer review before advancing."
        return f"Missing {len(missing_skills)} required skill(s). Recommend manual review before proceeding."

    # TODO: call the configured LLM provider here with job + candidate context.
    return "AI-generated recommendation not yet implemented."


def analyze_application(application_id, requester):
    application = Application.query.get(application_id)
    if application is None:
        raise NotFoundError("Application not found")

    job = Job.query.get(application.job_id)
    if job is None or job.manager_id != requester.id:
        raise ForbiddenError("You do not manage this job")

    candidate = User.query.get(application.candidate_id)

    existing = AIAnalysis.query.filter_by(application_id=application.id).first()
    if existing is not None:
        return existing, candidate

    candidate_text = " ".join(filter(None, [candidate.title, candidate.bio]))
    matched_skills, missing_skills = match_skills(job.required_skills, candidate_text)

    required_count = len(job.required_skills or [])
    score = round((len(matched_skills) / required_count) * 100) if required_count else 50
    match_status = compute_match_status(score)
    recommendation = generate_recommendation(score, matched_skills, missing_skills)

    analysis = AIAnalysis(
        application_id=application.id,
        score=score,
        match_status=match_status,
        matched_skills=matched_skills,
        missing_skills=missing_skills,
        recommendation=recommendation,
    )
    db.session.add(analysis)
    db.session.commit()
    return analysis, candidate
