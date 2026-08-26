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
