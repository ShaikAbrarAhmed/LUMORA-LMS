import frappe


def get_current_user():
    """Return the currently logged-in user."""

    user = frappe.session.user

    if user == "Guest":
        frappe.throw(
            "Authentication required",
            frappe.PermissionError
        )

    return user


def require_role(role):
    """Ensure the current user has the required role."""

    user = get_current_user()

    has_required_role = frappe.db.exists(
        "Has Role",
        {
            "parent": user,
            "role": role
        }
    )

    if not has_required_role:
        frappe.throw(
            f"User {user} does not have the required role: {role}",
            frappe.PermissionError
        )

    return True