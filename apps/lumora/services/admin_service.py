import frappe


def get_admin_dashboard(user):
    """
    Returns dashboard data for the administrator.
    """

    courses = frappe.get_all(
        "LMS Course",
        fields=[
            "name",
            "title",
            "published"
        ]
    )

    batches = frappe.get_all(
        "LMS Batch",
        fields=[
            "name",
            "title",
            "start_date",
            "end_date",
            "published"
        ]
    )

    return {
        "success": True,
        "message": "Admin dashboard fetched successfully.",
        "user": user,
        "role": "System Manager",
        "courses": courses,
        "batches": batches
    }
