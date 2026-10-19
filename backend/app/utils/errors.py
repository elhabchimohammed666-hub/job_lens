class APIError(Exception):
    """Raised by services/routes for expected failures with an HTTP status code."""

    def __init__(self, message, status_code=400, payload=None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.payload = payload or {}

    def to_dict(self):
        body = {"error": self.message}
        body.update(self.payload)
        return body


class NotFoundError(APIError):
    def __init__(self, message="Resource not found"):
        super().__init__(message, status_code=404)


class ConflictError(APIError):
    def __init__(self, message="Resource already exists"):
        super().__init__(message, status_code=409)


class ForbiddenError(APIError):
    def __init__(self, message="Insufficient permissions"):
        super().__init__(message, status_code=403)


class ValidationError(APIError):
    def __init__(self, message="Invalid request payload"):
        super().__init__(message, status_code=400)
