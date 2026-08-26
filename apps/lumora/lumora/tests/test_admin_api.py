import frappe
from frappe.tests.utils import FrappeTestCase

from lumora.api.admin import admin_dashboard


class TestAdminAPI(FrappeTestCase):
    def setUp(self):
        self.user = "task9.student@example.com"

        if not frappe.db.exists("User", self.user):
            user = frappe.get_doc({
                "doctype": "User",
                "email": self.user,
                "first_name": "Task9",
                "roles": [{"role": "Student"}],
                "send_welcome_email": 0,
            })
            user.insert(ignore_permissions=True)

        frappe.set_user(self.user)

    def tearDown(self):
        frappe.set_user("Administrator")

    def test_student_cannot_access_admin_dashboard(self):
        with self.assertRaises(frappe.PermissionError):
            admin_dashboard()

        self.assertEqual(
            frappe.local.response.get("code"),
            "PERMISSION_DENIED",
        )
