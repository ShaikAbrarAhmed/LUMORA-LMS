import frappe

from lumora.api.permissions import (
    get_current_user,
    require_admin
)

from lumora.services.admin_service import (
    get_admin_dashboard
)


@frappe.whitelist()
def admin_dashboard():
    """
    Admin Dashboard API
    Accessible only by users with the System Manager role.
    """

    require_admin()

    user = get_current_user()

    return get_admin_dashboard(user)
