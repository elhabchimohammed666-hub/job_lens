from app.extensions import db
from app.models.ai_analysis import AIAnalysis
from app.models.application import VALID_APPLICATION_STATUSES, Application
from app.models.job import Job
from app.utils.errors import ConflictError, ForbiddenError, NotFoundError, ValidationError

DEFAULT_PAGE_SIZE = 20


def apply_to_job(job_id, candidate, cover_letter=None, resume_url=None):
    job = Job.query.get(job_id)
    if job is None or job.status != "published":
        raise NotFoundError("Job not found")

    existing = Application.query.filter_by(job_id=job_id, candidate_id=candidate.id).first()
    if existing is not None:
        raise ConflictError("You have already applied to this job")

    application = Application(
        job_id=job_id,
        candidate_id=candidate.id,
        cover_letter=cover_letter,
        resume_url=resume_url or candidate.resume_url,
    )
    db.session.add(application)
    db.session.commit()
    return application


def get_application(application_id):
    return Application.query.get(application_id)


def list_applications_for_candidate(candidate_id):
    return (
        Application.query.filter_by(candidate_id=candidate_id)
        .order_by(Application.applied_at.desc())
        .all()
    )


def list_applicants_for_job(job_id, manager, filters=None, page=1, limit=DEFAULT_PAGE_SIZE):
    job = Job.query.get(job_id)
    if job is None:
        raise NotFoundError("Job not found")
    if job.manager_id != manager.id:
        raise ForbiddenError("You do not manage this job")

    filters = filters or {}
    query = Application.query.filter_by(job_id=job_id)

    if filters.get("match_status"):
        query = query.join(AIAnalysis, AIAnalysis.application_id == Application.id).filter(
            AIAnalysis.match_status == filters["match_status"]
        )

    if filters.get("search"):
        from app.models.user import User

        term = f"%{filters['search']}%"
        query = query.join(User, User.id == Application.candidate_id).filter(
            db.or_(User.full_name.ilike(term), User.email.ilike(term))
        )

    total = query.count()
    page = max(page, 1)
    limit = max(min(limit, 100), 1)
    applicants = (
        query.order_by(Application.applied_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )
    return applicants, total


def update_application_status(application_id, manager, status):
    if status not in VALID_APPLICATION_STATUSES:
        raise ValidationError(f"status must be one of {VALID_APPLICATION_STATUSES}")

    application = Application.query.get(application_id)
    if application is None:
        raise NotFoundError("Application not found")

    job = Job.query.get(application.job_id)
    if job is None or job.manager_id != manager.id:
        raise ForbiddenError("You do not manage this job")

    application.status = status
    db.session.commit()
    return application
