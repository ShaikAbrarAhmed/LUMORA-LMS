import frappe

from lumora.exceptions import PermissionException


def require_role(*roles: str):
    """
    Ensure the current session user has at least one
    of the required roles.
    """

    user_roles = set(frappe.get_roles(frappe.session.user))

    if not user_roles.intersection(roles):
        raise PermissionException(
            f"Requires one of roles: {', '.join(roles)}"
        )

    return True


def require_admin():
    """Ensure the current user has the Admin role."""
    return require_role("System Manager")


def require_student():
    """Ensure the current user has the Student role."""
    return require_role("Student")


def require_mentor():
    """Ensure the current user has the Mentor role."""
    return require_role("Mentor")