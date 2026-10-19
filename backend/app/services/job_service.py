from app.extensions import db
from app.models.job import VALID_JOB_STATUSES, Job
from app.utils.errors import ForbiddenError, NotFoundError, ValidationError

UPDATABLE_FIELDS = (
    "title",
    "company",
    "location",
    "employment_type",
    "level",
    "description",
    "required_skills",
    "status",
)

DEFAULT_PAGE_SIZE = 20


def create_job(data, manager_id):
    status = data.get("status", "published")
    if status not in VALID_JOB_STATUSES:
        raise ValidationError(f"status must be one of {VALID_JOB_STATUSES}")

    job = Job(
        title=data["title"],
        company=data["company"],
        location=data.get("location"),
        employment_type=data.get("employment_type") or data.get("type"),
        level=data.get("level"),
        description=data.get("description"),
        required_skills=data.get("required_skills", []),
        status=status,
        manager_id=manager_id,
    )
    db.session.add(job)
    db.session.commit()
    return job


def get_job(job_id, requester=None):
    job = Job.query.get(job_id)
    if job is None:
        return None

    if job.status == "draft" and (requester is None or requester.id != job.manager_id):
        return None

    return job


def list_jobs(filters=None, page=1, limit=DEFAULT_PAGE_SIZE, requester=None):
    """Public listing (published only) unless `mine=True` is set for the owning manager."""
    filters = filters or {}
    mine = filters.get("mine") and requester is not None

    query = Job.query.filter_by(manager_id=requester.id) if mine else Job.query.filter_by(status="published")

    if filters.get("search"):
        term = f"%{filters['search']}%"
        query = query.filter(db.or_(Job.title.ilike(term), Job.description.ilike(term)))
    if filters.get("location"):
        query = query.filter(Job.location.ilike(f"%{filters['location']}%"))
    if filters.get("type"):
        query = query.filter(Job.employment_type == filters["type"])
    if filters.get("level"):
        query = query.filter(Job.level == filters["level"])

    total = query.count()
    page = max(page, 1)
    limit = max(min(limit, 100), 1)
    jobs = (
        query.order_by(Job.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )
    return jobs, total


def update_job(job_id, data, manager):
    job = Job.query.get(job_id)
    if job is None:
        raise NotFoundError("Job not found")
    if job.manager_id != manager.id:
        raise ForbiddenError("You do not manage this job")

    if "status" in data and data["status"] not in VALID_JOB_STATUSES:
        raise ValidationError(f"status must be one of {VALID_JOB_STATUSES}")

    for field in UPDATABLE_FIELDS:
        if field in data:
            setattr(job, field, data[field])

    db.session.commit()
    return job


def delete_job(job_id, manager):
    job = Job.query.get(job_id)
    if job is None:
        raise NotFoundError("Job not found")
    if job.manager_id != manager.id:
        raise ForbiddenError("You do not manage this job")

    db.session.delete(job)
    db.session.commit()
