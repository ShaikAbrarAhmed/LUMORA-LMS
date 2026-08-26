import frappe


def create_profile_for_user(doc, method=None):
    roles = {role.role for role in doc.get("roles", [])}

    if "Student" in roles:
        if not frappe.db.exists("Lumora Student Profile", {"user": doc.name}):
            frappe.get_doc({
                "doctype": "Lumora Student Profile",
                "user": doc.name,
            }).insert(ignore_permissions=True)

    if "Mentor" in roles:
        if not frappe.db.exists("Lumora Mentor Profile", {"user": doc.name}):
            frappe.get_doc({
                "doctype": "Lumora Mentor Profile",
                "user": doc.name,
            }).insert(ignore_permissions=True)


EDITABLE_STUDENT_PROFILE_FIELDS = {"bio", "phone", "avatar"}


def get_my_profile(user):
    profile = frappe.db.get_value(
        "Lumora Student Profile",
        {"user": user},
        ["name", "user", "bio", "phone", "avatar", "cohort"],
        as_dict=True,
    )

    if not profile:
        frappe.throw("Student profile not found", frappe.DoesNotExistError)

    return profile


def update_my_profile(user, data):
    unknown_fields = set(data) - EDITABLE_STUDENT_PROFILE_FIELDS

    if unknown_fields:
        frappe.throw(
            f"Fields not editable: {', '.join(sorted(unknown_fields))}",
            frappe.ValidationError,
        )

    profile_name = frappe.db.get_value(
        "Lumora Student Profile",
        {"user": user},
        "name",
    )

    if not profile_name:
        frappe.throw("Student profile not found", frappe.DoesNotExistError)

    profile = frappe.get_doc("Lumora Student Profile", profile_name)

    for field, value in data.items():
        setattr(profile, field, value)

    profile.save(ignore_permissions=True)

    return get_my_profile(user)
