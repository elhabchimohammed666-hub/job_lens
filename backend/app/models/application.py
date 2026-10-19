import uuid
from datetime import datetime, timezone

from app.extensions import db

VALID_APPLICATION_STATUSES = ("submitted", "under_review", "accepted", "rejected")


class Application(db.Model):
    __tablename__ = "applications"
    __table_args__ = (db.UniqueConstraint("job_id", "candidate_id", name="uq_application_job_candidate"),)

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    job_id = db.Column(db.Uuid, db.ForeignKey("jobs.id"), nullable=False)
    candidate_id = db.Column(db.Uuid, db.ForeignKey("users.id"), nullable=False)
    cover_letter = db.Column(db.Text)
    resume_url = db.Column(db.Text)
    status = db.Column(db.String(20), nullable=False, default="submitted")
    applied_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    ai_analysis = db.relationship(
        "AIAnalysis", backref="application", uselist=False, foreign_keys="AIAnalysis.application_id"
    )

    def to_dict(self):
        return {
            "id": str(self.id),
            "job_id": str(self.job_id),
            "candidate_id": str(self.candidate_id),
            "cover_letter": self.cover_letter,
            "resume_url": self.resume_url,
            "status": self.status,
            "applied_at": self.applied_at.isoformat() if self.applied_at else None,
        }

    def __repr__(self):
        return f"<Application job={self.job_id} candidate={self.candidate_id}>"
