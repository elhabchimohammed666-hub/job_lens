import uuid
from datetime import datetime, timezone

from app.extensions import db

VALID_MATCH_STATUSES = ("strong_match", "good_match", "requires_review")


class AIAnalysis(db.Model):
    __tablename__ = "ai_analyses"

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    application_id = db.Column(db.Uuid, db.ForeignKey("applications.id"), unique=True, nullable=False)
    score = db.Column(db.Integer)  # 0-100 compatibility percentage
    match_status = db.Column(db.String(30))  # strong_match | good_match | requires_review
    matched_skills = db.Column(db.JSON)  # [{ name, level }]
    missing_skills = db.Column(db.JSON)  # [{ name }]
    recommendation = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": str(self.id),
            "application_id": str(self.application_id),
            "score": self.score,
            "match_status": self.match_status,
            "matched_skills": self.matched_skills or [],
            "missing_skills": self.missing_skills or [],
            "recommendation": self.recommendation,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<AIAnalysis application={self.application_id} score={self.score}>"
