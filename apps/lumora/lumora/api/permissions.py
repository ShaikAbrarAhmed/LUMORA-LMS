import frappe


def get_current_user():
    """
    Returns the currently logged-in user.
    """
    return frappe.session.user


def get_current_user_roles():
    """
    Returns all roles assigned to the current user.
    """
    return frappe.get_roles(get_current_user())


def require_role(required_role):
    """
    Ensures the logged-in user has the required role.
    Raises a PermissionError if the role is missing.
    """
    roles = get_current_user_roles()

    if required_role not in roles:
        frappe.local.response["code"] = "PERMISSION_DENIED"
        frappe.throw(
            f"You are not authorized. Required role: {required_role}",
            frappe.PermissionError,
        )

    return True


def require_any_role(required_roles):
    """
    Allows access if the user has at least one of the required roles.
    """
    roles = get_current_user_roles()

    for role in required_roles:
        if role in roles:
            return True

    frappe.local.response["code"] = "PERMISSION_DENIED"
    frappe.throw(
        "You don't have permission to access this resource.",
        frappe.PermissionError,
    )


def require_admin():
    """
    Ensures the logged-in user has the System Manager role.
    """
    return require_role("System Manager")
