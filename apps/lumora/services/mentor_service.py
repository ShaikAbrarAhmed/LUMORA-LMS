import frappe


def get_mentor_dashboard(user):
    """
    Returns dashboard data for the logged-in mentor.
    """

    mentor_courses = frappe.get_all(
        "LMS Course Mentor Mapping",
        filters={
            "mentor": user
        },
        fields=[
            "course",
            "mentor_name"
        ]
    )

    return {
        "success": True,
        "message": "Mentor dashboard fetched successfully.",
        "user": user,
        "role": "Mentor",
        "courses": mentor_courses
    }
