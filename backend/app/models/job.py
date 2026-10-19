import uuid
from datetime import datetime, timezone

from app.extensions import db

VALID_EMPLOYMENT_TYPES = ("fulltime", "contract", "parttime")
VALID_LEVELS = ("junior", "mid", "senior")
VALID_JOB_STATUSES = ("draft", "published")


class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    manager_id = db.Column(db.Uuid, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    employment_type = db.Column(db.String(50))
    level = db.Column(db.String(50))
    description = db.Column(db.Text)
    required_skills = db.Column(db.JSON, default=list)
    status = db.Column(db.String(20), nullable=False, default="draft")  # draft | published
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    applications = db.relationship(
        "Application", backref="job", lazy="dynamic", foreign_keys="Application.job_id"
    )

    def to_dict(self):
        return {
            "id": str(self.id),
            "manager_id": str(self.manager_id),
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "employment_type": self.employment_type,
            "level": self.level,
            "description": self.description,
            "required_skills": self.required_skills or [],
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    def __repr__(self):
        return f"<Job {self.title} @ {self.company}>"
