import frappe


def get_courses(page=1, page_size=20, search=None, category=None):
    page = int(page)
    page_size = int(page_size)

    if page < 1:
        frappe.throw("Page must be at least 1", frappe.ValidationError)

    if page_size < 1:
        frappe.throw("Page size must be at least 1", frappe.ValidationError)

    filters = {"status": "Published"}

    if category:
        filters["category"] = category

    if search:
        search = str(search).strip()
        if search:
            filters["title"] = ["like", f"%{search}%"]

    total = frappe.db.count("Lumora Course", filters=filters)

    courses = frappe.get_all(
        "Lumora Course",
        filters=filters,
        fields=[
            "name",
            "title",
            "slug",
            "description",
            "category",
            "status",
            "mentor",
            "thumbnail",
        ],
        order_by="modified desc",
        start=(page - 1) * page_size,
        page_length=page_size,
    )

    return {
        "courses": courses,
        "total": total,
    }


def get_course_detail(slug):
    course = frappe.db.get_value(
        "Lumora Course",
        {"slug": slug},
        [
            "name",
            "title",
            "slug",
            "description",
            "category",
            "status",
            "mentor",
            "thumbnail",
            "owner",
        ],
        as_dict=True,
    )

    if not course:
        frappe.throw("Course not found", frappe.DoesNotExistError)

    current_user = frappe.session.user
    is_admin = "System Manager" in frappe.get_roles(current_user)

    if course.status == "Draft" and course.owner != current_user and not is_admin:
        frappe.throw("Course not found", frappe.DoesNotExistError)

    chapters = frappe.get_all(
        "Lumora Chapter",
        filters={"course": course.name},
        fields=["name", "title", "idx"],
        order_by="idx asc",
    )

    for chapter in chapters:
        chapter["lessons"] = frappe.get_all(
            "Lumora Lesson",
            filters={"chapter": chapter.name},
            fields=["name", "title", "idx"],
            order_by="idx asc",
        )

    course.pop("owner", None)

    return {
        "course": course,
        "outline": chapters,
    }
