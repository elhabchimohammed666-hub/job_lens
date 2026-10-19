import pytest

from app import create_app
from app.extensions import db as _db


@pytest.fixture
def app():
    flask_app = create_app("testing")
    with flask_app.app_context():
        _db.create_all()
        yield flask_app
        _db.session.remove()
        _db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


def register(client, email="user@example.com", password="password123", full_name="Test User", role="candidate"):
    response = client.post(
        "/api/auth/register",
        json={"full_name": full_name, "email": email, "password": password, "role": role},
    )
    body = response.get_json()
    return body["user"], body["access_token"]


def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}
