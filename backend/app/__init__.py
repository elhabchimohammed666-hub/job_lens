import os

from flask import Flask, jsonify

from app.config import config_by_name
from app.extensions import cors, db, jwt, migrate, revoked_token_jtis
from app.utils.errors import APIError


def create_app(config_name=None):
    """Application factory: builds and configures the Flask app instance."""
    config_name = config_name or os.environ.get("FLASK_ENV", "development")

    app = Flask(__name__)
    app.config.from_object(config_by_name.get(config_name, config_by_name["default"]))

    _init_extensions(app)
    _register_blueprints(app)
    _register_error_handlers(app)

    return app


def _init_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}}, supports_credentials=True)

    # Ensure models are registered with SQLAlchemy metadata before migrations run.
    from app import models  # noqa: F401

    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        return jwt_payload["jti"] in revoked_token_jtis

    @jwt.expired_token_loader
    def expired_token_response(jwt_header, jwt_payload):
        return jsonify({"error": "Token has expired"}), 401

    @jwt.invalid_token_loader
    def invalid_token_response(reason):
        return jsonify({"error": "Invalid token", "details": reason}), 401

    @jwt.unauthorized_loader
    def missing_token_response(reason):
        return jsonify({"error": "Authorization token required", "details": reason}), 401

    @jwt.revoked_token_loader
    def revoked_token_response(jwt_header, jwt_payload):
        return jsonify({"error": "Token has been revoked"}), 401


def _register_blueprints(app):
    from app.routes import register_blueprints

    register_blueprints(app)


def _register_error_handlers(app):
    @app.errorhandler(APIError)
    def handle_api_error(error):
        return jsonify(error.to_dict()), error.status_code

    @app.errorhandler(400)
    def handle_bad_request(error):
        return jsonify({"error": "Bad request"}), 400

    @app.errorhandler(404)
    def handle_not_found(error):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(405)
    def handle_method_not_allowed(error):
        return jsonify({"error": "Method not allowed"}), 405

    @app.errorhandler(500)
    def handle_server_error(error):
        app.logger.exception("Unhandled server error")
        return jsonify({"error": "Internal server error"}), 500
