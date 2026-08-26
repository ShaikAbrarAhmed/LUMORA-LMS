import frappe
from lumora.api.permissions import require_role

@frappe.whitelist()
def invite_user(email, first_name, role):
    """Invite a Student or Mentor to LUMORA."""
    # Only administrators can invite users
    require_role("System Manager") 
    # Validate supported roles
    if role not in ["Student", "Mentor"]:
        frappe.throw(
            "Role must be either Student or Mentor",
            frappe.ValidationError
        )

    # Check whether the user already exists
    if frappe.db.exists("User", email):
        frappe.throw(
            f"User with email {email} already exists",
            frappe.ValidationError
        )

    # Create the user with the role BEFORE insertion
    user = frappe.get_doc({
        "doctype": "User",
        "email": email,
        "first_name": first_name,
        "roles": [
            {"role": role}
        ]
    })

    user.insert(ignore_permissions=True)
    reset_link = user._reset_password(send_email=False)
    return {
        "message": "User invited successfully",
        "user": user.name,
        "role": role
    }