import frappe

from lumora.exceptions import NotFoundException, ValidationException


def require_fields(payload: dict, fields: list[str]) -> None:
    """Ensure all required fields are present in the payload."""
    missing_fields = [
        field
        for field in fields
        if field not in payload or payload[field] is None
    ]

    if missing_fields:
        raise ValidationException(
            f"Missing required fields: {', '.join(missing_fields)}"
        )


def require_exists(doctype: str, name: str) -> None:
    """Ensure a Frappe document exists."""
    if not frappe.db.exists(doctype, name):
        raise NotFoundException(
            f"{doctype} '{name}' not found"
        )
