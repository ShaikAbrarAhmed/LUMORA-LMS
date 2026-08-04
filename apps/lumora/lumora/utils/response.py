def success_response(data=None):
    """Return the standard Lumora success response envelope."""
    return {
        "success": True,
        "data": data,
    }


def error_response(message, error):
    """Return the standard Lumora error response envelope."""
    return {
        "success": False,
        "message": message,
        "error": error,
    }
