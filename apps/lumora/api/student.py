import frappe

from lumora.api.permissions import (
    get_current_user,
    require_role
)
from lumora.services.student_service import (
    get_student_dashboard
)


@frappe.whitelist()
def student_dashboard():
    """
    Student Dashboard API
    Accessible only by users with the LMS Student role.
    """

    require_role("LMS Student")

    user = get_current_user()

    return get_student_dashboard(user)
