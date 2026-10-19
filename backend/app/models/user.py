import uuid
from datetime import datetime, timezone

from app.extensions import db

VALID_ROLES = ("candidate", "manager", "admin")


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default="candidate")  # candidate | manager | admin
    title = db.Column(db.String(255))
    bio = db.Column(db.Text)
    resume_url = db.Column(db.Text)
    avatar_url = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    jobs = db.relationship("Job", backref="manager", lazy="dynamic", foreign_keys="Job.manager_id")
    applications = db.relationship(
        "Application", backref="candidate", lazy="dynamic", foreign_keys="Application.candidate_id"
    )

    def to_dict(self):
        return {
            "id": str(self.id),
            "email": self.email,
            "full_name": self.full_name,
            "role": self.role,
            "title": self.title,
            "bio": self.bio,
            "resume_url": self.resume_url,
            "avatar_url": self.avatar_url,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<User {self.email}>"
