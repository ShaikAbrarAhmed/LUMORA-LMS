class LumoraException(Exception):
    """Base exception for all Lumora application errors."""

    http_status = 500
    error_code = "LUMORA_ERROR"

    def __init__(self, message="An unexpected error occurred"):
        super().__init__(message)
        self.message = message


class ValidationException(LumoraException):
    """Raised when request data fails validation."""

    http_status = 400
    error_code = "VALIDATION_ERROR"


class PermissionException(LumoraException):
    """Raised when the user does not have permission."""

    http_status = 403
    error_code = "PERMISSION_DENIED"


class NotFoundException(LumoraException):
    """Raised when a requested resource cannot be found."""

    http_status = 404
    error_code = "NOT_FOUND"
