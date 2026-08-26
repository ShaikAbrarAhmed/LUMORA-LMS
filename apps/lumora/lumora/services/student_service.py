import frappe


def get_student_dashboard(user):
    """Return dashboard data for the current student."""

    return {
        "user": user,
        "message": "Welcome to the LUMORA Student Dashboard"
    }
