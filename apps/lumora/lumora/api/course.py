import frappe

from lumora.services.course_service import (
    get_course_detail as get_course_detail_service,
    get_courses as get_courses_service,
)


@frappe.whitelist(allow_guest=True)
def get_courses(page=1, page_size=20, search=None, category=None):
    return get_courses_service(
        page=page,
        page_size=page_size,
        search=search,
        category=category,
    )


@frappe.whitelist(allow_guest=True)
def get_course_detail(slug):
    return get_course_detail_service(slug)
