import frappe


def get_student_dashboard(user):
    """
    Returns dashboard data for the logged-in student.
    """

    enrollments = frappe.get_all(
        "LMS Enrollment",
        filters={
            "member": user,
            "member_type": "Student"
        },
        fields=[
            "course",
            "progress",
            "current_lesson",
            "certificate"
        ]
    )

    return {
        "success": True,
        "message": "Student dashboard fetched successfully.",
        "user": user,
        "role": "LMS Student",
        "enrollments": enrollments
    }
