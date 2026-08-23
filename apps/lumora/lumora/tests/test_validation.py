import frappe
from frappe.tests.utils import FrappeTestCase

from lumora.utils.validation import (
    validate_email_format,
    validate_unique_email,
)


class TestValidation(FrappeTestCase):
    def test_invalid_email_is_rejected(self):
        with self.assertRaises(frappe.ValidationError):
            validate_email_format("not-an-email")

    def test_valid_email_is_accepted(self):
        self.assertEqual(
            validate_email_format("valid@example.com"),
            "valid@example.com",
        )

    def test_duplicate_email_is_rejected(self):
        with self.assertRaises(frappe.DuplicateEntryError):
            validate_unique_email("admin@example.com")

    def test_existing_user_email_can_be_kept(self):
        self.assertEqual(
            validate_unique_email(
                "admin@example.com",
                exclude_name="Administrator",
            ),
            "admin@example.com",
        )
