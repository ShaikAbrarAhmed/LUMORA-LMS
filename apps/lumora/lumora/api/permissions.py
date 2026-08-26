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
def verify_owner(doctype, name, owner_field="owner", user=None):
    """Ensure the user owns the specified document."""

    user = user or get_current_user()

    # Admin can access any record
    if "Admin" in frappe.get_roles(user):
        return True

    owner = frappe.db.get_value(
        doctype,
        name,
        owner_field
    )

    if owner != user:
        frappe.throw(
            f"User {user} does not own this {doctype}: {name}",
            frappe.PermissionError
        )

    return True
