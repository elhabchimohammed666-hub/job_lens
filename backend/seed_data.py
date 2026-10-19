"""Seed the database with fake users, jobs, applications, and AI analyses.

Usage:
    venv/bin/python seed_data.py          # add fake data (skips existing emails)
    venv/bin/python seed_data.py --reset  # wipe jobs/applications/analyses/seed users first
"""
import random
import sys
import uuid
from datetime import datetime, timedelta, timezone

from werkzeug.security import generate_password_hash

from app import create_app
from app.extensions import db
from app.models import AIAnalysis, Application, Job, User

SEED_PASSWORD = "Password123!"

MANAGERS = [
    {"email": "manager.dana@techcorp.io", "full_name": "Dana Whitfield", "title": "Head of Engineering"},
    {"email": "manager.omar@brightpath.com", "full_name": "Omar Haddad", "title": "Talent Acquisition Lead"},
    {"email": "manager.lucia@nimbusworks.com", "full_name": "Lucia Ferrante", "title": "VP of Product"},
]

CANDIDATES = [
    {"email": "sara.klein@example.com", "full_name": "Sara Klein", "title": "Frontend Developer"},
    {"email": "ahmed.saleh@example.com", "full_name": "Ahmed Saleh", "title": "Backend Developer"},
    {"email": "mia.tanaka@example.com", "full_name": "Mia Tanaka", "title": "Full Stack Engineer"},
    {"email": "leo.martins@example.com", "full_name": "Leo Martins", "title": "Data Engineer"},
    {"email": "priya.nair@example.com", "full_name": "Priya Nair", "title": "DevOps Engineer"},
    {"email": "tom.becker@example.com", "full_name": "Tom Becker", "title": "Mobile Developer"},
    {"email": "yuna.kim@example.com", "full_name": "Yuna Kim", "title": "Product Designer"},
    {"email": "carlos.reyes@example.com", "full_name": "Carlos Reyes", "title": "QA Engineer"},
    {"email": "nadia.petrov@example.com", "full_name": "Nadia Petrov", "title": "Machine Learning Engineer"},
    {"email": "jack.oconnor@example.com", "full_name": "Jack O'Connor", "title": "Software Engineer"},
]

SKILL_POOL = [
    "Python", "JavaScript", "TypeScript", "React", "Vue", "Node.js", "Flask",
    "Django", "PostgreSQL", "Docker", "Kubernetes", "AWS", "GraphQL", "SQL",
    "Go", "Swift", "Kotlin", "CI/CD", "Terraform", "Redis",
]

JOB_TEMPLATES = [
    ("Senior Backend Engineer", "TechCorp", "fulltime", "senior",
     "Own the design and scaling of our core API services."),
    ("Frontend Developer", "TechCorp", "fulltime", "mid",
     "Build delightful, accessible interfaces with React and TypeScript."),
    ("DevOps Engineer", "BrightPath", "contract", "senior",
     "Manage our Kubernetes infrastructure and CI/CD pipelines."),
    ("Junior Full Stack Developer", "BrightPath", "fulltime", "junior",
     "Work across the stack on a small, fast-moving product team."),
    ("Data Engineer", "NimbusWorks", "fulltime", "mid",
     "Design data pipelines that power our analytics platform."),
    ("Product Designer", "NimbusWorks", "parttime", "mid",
     "Shape the end-to-end user experience for our flagship app."),
    ("Machine Learning Engineer", "TechCorp", "fulltime", "senior",
     "Build and ship ML models into production at scale."),
    ("QA Automation Engineer", "BrightPath", "contract", "mid",
     "Build automated test suites to keep releases reliable."),
]

COVER_LETTERS = [
    "I'm excited about this opportunity and believe my background is a strong fit.",
    "Your job posting immediately caught my attention — I'd love to contribute to the team.",
    "I've followed your company's work for a while and would be thrilled to join.",
    "My experience aligns closely with what you're looking for in this role.",
    None,
]

APPLICATION_STATUSES = ("submitted", "under_review", "accepted", "rejected")
MATCH_STATUSES = ("strong_match", "good_match", "requires_review")


def days_ago(n):
    return datetime.now(timezone.utc) - timedelta(days=n)


def get_or_create_user(email, full_name, role, title):
    user = User.query.filter_by(email=email).first()
    if user:
        return user, False
    user = User(
        id=uuid.uuid4(),
        email=email,
        password_hash=generate_password_hash(SEED_PASSWORD),
        full_name=full_name,
        role=role,
        title=title,
        bio=f"{title} with a passion for building great products.",
        created_at=days_ago(random.randint(30, 200)),
    )
    db.session.add(user)
    return user, True


def seed(reset=False):
    app = create_app()
    with app.app_context():
        if reset:
            print("Resetting AI analyses, applications, and jobs...")
            AIAnalysis.query.delete()
            Application.query.delete()
            Job.query.delete()
            db.session.commit()

        created_managers = []
        for m in MANAGERS:
            user, created = get_or_create_user(m["email"], m["full_name"], "manager", m["title"])
            created_managers.append(user)
            if created:
                print(f"Created manager: {user.email}")

        created_candidates = []
        for c in CANDIDATES:
            user, created = get_or_create_user(c["email"], c["full_name"], "candidate", c["title"])
            created_candidates.append(user)
            if created:
                print(f"Created candidate: {user.email}")

        db.session.commit()

        jobs = []
        for title, company, employment_type, level, description in JOB_TEMPLATES:
            manager = random.choice(created_managers)
            job = Job(
                id=uuid.uuid4(),
                manager_id=manager.id,
                title=title,
                company=company,
                location=random.choice(["Remote", "New York, NY", "Berlin, Germany", "Austin, TX", "London, UK"]),
                employment_type=employment_type,
                level=level,
                description=description,
                required_skills=random.sample(SKILL_POOL, k=random.randint(3, 6)),
                status=random.choice(["published", "published", "published", "draft"]),
                created_at=days_ago(random.randint(1, 60)),
            )
            db.session.add(job)
            jobs.append(job)
        db.session.commit()
        print(f"Created {len(jobs)} jobs")

        application_count = 0
        analysis_count = 0
        for job in jobs:
            applicants = random.sample(created_candidates, k=random.randint(2, len(created_candidates)))
            for candidate in applicants:
                existing = Application.query.filter_by(job_id=job.id, candidate_id=candidate.id).first()
                if existing:
                    continue
                status = random.choice(APPLICATION_STATUSES)
                application = Application(
                    id=uuid.uuid4(),
                    job_id=job.id,
                    candidate_id=candidate.id,
                    cover_letter=random.choice(COVER_LETTERS),
                    resume_url=f"https://storage.joblens.dev/resumes/{candidate.id}.pdf",
                    status=status,
                    applied_at=days_ago(random.randint(0, 45)),
                )
                db.session.add(application)
                application_count += 1

                if random.random() < 0.7:
                    matched = random.sample(job.required_skills, k=min(len(job.required_skills), random.randint(1, 4)))
                    missing = [s for s in job.required_skills if s not in matched][:2]
                    score = random.randint(45, 98)
                    analysis = AIAnalysis(
                        id=uuid.uuid4(),
                        application_id=application.id,
                        score=score,
                        match_status=(
                            "strong_match" if score >= 80 else "good_match" if score >= 60 else "requires_review"
                        ),
                        matched_skills=[{"name": s, "level": random.choice(["basic", "intermediate", "expert"])} for s in matched],
                        missing_skills=[{"name": s} for s in missing],
                        recommendation=random.choice([
                            "Strong candidate, recommend moving to interview.",
                            "Good fit overall, worth a screening call.",
                            "Some skill gaps, review manually before proceeding.",
                            "Solid technical background, aligns with role requirements.",
                        ]),
                        created_at=application.applied_at + timedelta(hours=random.randint(1, 48)),
                    )
                    db.session.add(analysis)
                    analysis_count += 1

        db.session.commit()
        print(f"Created {application_count} applications")
        print(f"Created {analysis_count} AI analyses")
        print(f"\nAll seed users share the password: {SEED_PASSWORD}")


if __name__ == "__main__":
    seed(reset="--reset" in sys.argv)
