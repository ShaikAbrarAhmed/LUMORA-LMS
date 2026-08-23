import frappe
from frappe.tests.utils import FrappeTestCase

from lumora.api.profile import get_my_profile, update_my_profile


class TestProfileAPI(FrappeTestCase):
    def setUp(self):
        self.user = "task8.student@example.com"

        if not frappe.db.exists("User", self.user):
            user = frappe.get_doc({
                "doctype": "User",
                "email": self.user,
                "first_name": "Task8",
                "roles": [{"role": "Student"}],
                "send_welcome_email": 0,
            })
            user.insert(ignore_permissions=True)

        self.profile = frappe.db.get_value(
            "Lumora Student Profile",
            {"user": self.user},
            "name",
        )

        if not self.profile:
            frappe.get_doc({
                "doctype": "Lumora Student Profile",
                "user": self.user,
            }).insert(ignore_permissions=True)

        frappe.set_user(self.user)

    def tearDown(self):
        frappe.set_user("Administrator")

    def test_get_my_profile(self):
        profile = get_my_profile()
        self.assertEqual(profile["user"], self.user)

    def test_update_my_profile_allows_bio(self):
        profile = update_my_profile(bio="Test bio")
        self.assertEqual(profile["bio"], "Test bio")

    def test_update_my_profile_rejects_cohort(self):
        with self.assertRaises(frappe.ValidationError):
            update_my_profile(cohort="some-batch")
