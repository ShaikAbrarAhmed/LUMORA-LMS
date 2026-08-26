import frappe

from lumora.api.permissions import get_current_user, require_role
from lumora.services.profile_service import (
    get_my_profile as get_profile,
    update_my_profile as update_profile,
)


@frappe.whitelist()
def get_my_profile():
    require_role("Student")
    return get_profile(get_current_user())


@frappe.whitelist()
def update_my_profile(**data):
    require_role("Student")
    return update_profile(get_current_user(), data)
