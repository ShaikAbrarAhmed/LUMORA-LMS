import frappe


def log_error(message: str, title: str = "Lumora Error") -> None:
    """Log an error using Frappe's error logging."""
    frappe.log_error(
        message=message,
        title=title,
    )


def log_info(message: str) -> None:
    """Log an informational message."""
    frappe.logger("lumora").info(message)
