from functools import wraps

import frappe

from lumora.exceptions import LumoraException
from lumora.utils.response import error_response, success_response


def lumora_api(func):
    """Wrap a Lumora API method with standard response and error handling."""

    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            data = func(*args, **kwargs)
            return success_response(data)

        except LumoraException as exc:
            frappe.local.response["http_status_code"] = exc.http_status

            return error_response(
                message=exc.message,
                error=exc.error_code,
            )

        except Exception:
            frappe.log_error(
                title="Unhandled Lumora API Exception",
                message=frappe.get_traceback(),
            )

            frappe.local.response["http_status_code"] = 500

            return error_response(
                message="An unexpected error occurred",
                error="INTERNAL_SERVER_ERROR",
            )

    return wrapper
