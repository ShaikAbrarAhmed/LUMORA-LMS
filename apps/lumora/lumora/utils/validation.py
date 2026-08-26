import re

import frappe


EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def validate_email_format(email):
    if not email or not EMAIL_PATTERN.fullmatch(email):
        frappe.throw(
            "Invalid email format",
            frappe.ValidationError,
        )

    return email


def validate_unique_email(email, doctype="User", exclude_name=None):
    filters = {"email": email}

    if exclude_name:
        filters["name"] = ["!=", exclude_name]

    if frappe.db.exists(doctype, filters):
        frappe.throw(
            "Email already exists",
            frappe.DuplicateEntryError,
        )

    return email
