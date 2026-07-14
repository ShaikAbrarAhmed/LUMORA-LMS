import frappe

from lumora.api.permissions import (
    get_current_user,
    require_role
)

from lumora.services.mentor_service import (
    get_mentor_dashboard
)


@frappe.whitelist()
def mentor_dashboard():
    """
    Mentor Dashboard API
    Accessible only by users with the Mentor role.
    """

    require_role("Mentor")

    user = get_current_user()

    return get_mentor_dashboard(user)

