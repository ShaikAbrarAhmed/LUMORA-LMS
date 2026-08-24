
import frappe

from lumora.exceptions import NotFoundException, PermissionException, ValidationException
from lumora.utils import lumora_api


def _get_current_user_payload():
    """Return normalized information about the currently authenticated user."""
    user = frappe.session.user

    user_data = frappe.db.get_value(
        "User",
        user,
        ["email", "full_name"],
        as_dict=True,
    )

    if not user_data:
        raise NotFoundException("Authenticated user not found")

    return {
        "email": user_data.email,
        "full_name": user_data.full_name,
        "roles": frappe.get_roles(user),
    }


@frappe.whitelist(allow_guest=True)
@lumora_api
def login(usr=None, pwd=None):
    """Authenticate using Frappe's built-in LoginManager."""
    if not usr or not pwd:
        raise ValidationException("Username and password are required")

    frappe.local.form_dict["usr"] = usr
    frappe.local.form_dict["pwd"] = pwd
    frappe.local.form_dict["cmd"] = "login"

    frappe.local.login_manager.login()

    return _get_current_user_payload()



@frappe.whitelist()
@lumora_api
def logout():
    """Log out the current authenticated Frappe session."""
    if frappe.session.user == "Guest":
        raise PermissionException("Authentication required")
    frappe.local.login_manager.logout()
    frappe.db.commit()

    return {}


@frappe.whitelist()
@lumora_api
def get_session_user():
    """Return the currently authenticated user's normalized information."""
    if frappe.session.user == "Guest":
        raise PermissionException("Authentication required")

    return _get_current_user_payload()
