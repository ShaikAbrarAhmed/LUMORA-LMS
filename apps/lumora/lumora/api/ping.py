import frappe

from lumora.utils import lumora_api


@frappe.whitelist(allow_guest=True)
@lumora_api
def ping():
    """Health-check endpoint for the Lumora API."""
    return {
        "message": "Lumora API is working",
    }
