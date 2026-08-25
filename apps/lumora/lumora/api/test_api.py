import frappe

from lumora.exceptions import (
    NotFoundException,
    PermissionException,
    ValidationException,
)
from lumora.utils import lumora_api


@frappe.whitelist(allow_guest=True)
@lumora_api
def test_success():
    return {"message": "Lumora API is working"}


@frappe.whitelist(allow_guest=True)
@lumora_api
def test_validation_error():
    raise ValidationException("Invalid test data")


@frappe.whitelist(allow_guest=True)
@lumora_api
def test_permission_error():
    raise PermissionException("Permission denied")


@frappe.whitelist(allow_guest=True)
@lumora_api
def test_not_found_error():
    raise NotFoundException("Test resource not found")


@frappe.whitelist(allow_guest=True)
@lumora_api
def test_unhandled_error():
    raise RuntimeError("Sensitive internal test error")
