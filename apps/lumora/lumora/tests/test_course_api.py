import frappe
from frappe.tests.utils import FrappeTestCase

from lumora.api.course import (
    get_course_detail as get_course_detail_api,
    get_courses as get_courses_api,
)
from lumora.services.course_service import get_course_detail, get_courses


class TestCourseAPI(FrappeTestCase):
    def setUp(self):
        self.owner = "task12.owner@example.com"
        self.student = "task12.student@example.com"

        for email, first_name, roles in [
            (self.owner, "Task12 Owner", [{"role": "Student"}]),
            (self.student, "Task12 Student", [{"role": "Student"}]),
        ]:
            if not frappe.db.exists("User", email):
                frappe.get_doc({
                    "doctype": "User",
                    "email": email,
                    "first_name": first_name,
                    "roles": roles,
                    "send_welcome_email": 0,
                }).insert(ignore_permissions=True)

        self.published_slug = "task12-published-course"
        self.draft_slug = "task12-draft-course"

        frappe.set_user(self.owner)

        for slug, title, status in [
            (
                self.published_slug,
                "Task 12 Published Course",
                "Published",
            ),
            (
                self.draft_slug,
                "Task 12 Draft Course",
                "Draft",
            ),
        ]:
            if not frappe.db.exists("Lumora Course", {"slug": slug}):
                frappe.get_doc({
                    "doctype": "Lumora Course",
                    "title": title,
                    "slug": slug,
                    "status": status,
                    "mentor": self.owner,
                }).insert(ignore_permissions=True)

        self.published_course = frappe.db.get_value(
            "Lumora Course",
            {"slug": self.published_slug},
            "name",
        )

        self.draft_course = frappe.db.get_value(
            "Lumora Course",
            {"slug": self.draft_slug},
            "name",
        )

    def tearDown(self):
        frappe.set_user("Administrator")

    def test_guest_can_call_get_courses_api(self):
        frappe.set_user("Guest")

        result = get_courses_api(page=1, page_size=20)

        self.assertIn("courses", result)
        self.assertIn("total", result)
        self.assertTrue(
            all(course["status"] == "Published" for course in result["courses"])
        )

    def test_guest_can_call_published_course_detail_api(self):
        frappe.set_user("Guest")

        result = get_course_detail_api(self.published_slug)

        self.assertEqual(result["course"]["slug"], self.published_slug)
        self.assertEqual(result["course"]["status"], "Published")

    def test_get_courses_supports_search_category_and_pagination(self):
        frappe.set_user("Guest")

        first = get_courses(
            page=1,
            page_size=1,
            search="Task 12 Published",
        )

        self.assertEqual(first["total"], 1)
        self.assertEqual(len(first["courses"]), 1)
        self.assertEqual(first["courses"][0]["slug"], self.published_slug)

        category = frappe.get_doc("Lumora Course", self.published_course)
        category.category = "Python"
        category.save(ignore_permissions=True)

        filtered = get_courses(
            page=1,
            page_size=20,
            category="Python",
        )

        self.assertEqual(filtered["total"], 1)
        self.assertEqual(filtered["courses"][0]["slug"], self.published_slug)

    def test_get_courses_returns_only_published_courses(self):
        frappe.set_user(self.student)

        result = get_courses(page=1, page_size=20)

        slugs = {course["slug"] for course in result["courses"]}

        self.assertIn(self.published_slug, slugs)
        self.assertNotIn(self.draft_slug, slugs)

    def test_non_owner_cannot_access_draft_detail(self):
        frappe.set_user(self.student)

        with self.assertRaises(frappe.DoesNotExistError):
            get_course_detail(self.draft_slug)

    def test_admin_can_access_draft_detail(self):
        frappe.set_user("Administrator")

        result = get_course_detail(self.draft_slug)

        self.assertEqual(result["course"]["slug"], self.draft_slug)
        self.assertEqual(result["course"]["status"], "Draft")

    def test_owner_can_access_draft_detail(self):
        frappe.set_user(self.owner)

        result = get_course_detail(self.draft_slug)

        self.assertEqual(result["course"]["slug"], self.draft_slug)
        self.assertEqual(result["course"]["status"], "Draft")

    def test_detail_outline_excludes_lesson_content(self):
        frappe.set_user(self.student)

        chapter = frappe.get_doc({
            "doctype": "Lumora Chapter",
            "course": self.published_course,
            "title": "Task 12 Chapter",
            "idx": 1,
        }).insert(ignore_permissions=True)

        frappe.get_doc({
            "doctype": "Lumora Lesson",
            "chapter": chapter.name,
            "title": "Task 12 Lesson",
            "content": "PRIVATE LESSON CONTENT",
            "video_url": "https://example.com/video",
            "idx": 1,
        }).insert(ignore_permissions=True)

        result = get_course_detail(self.published_slug)

        self.assertEqual(result["outline"][0]["title"], "Task 12 Chapter")
        self.assertEqual(
            result["outline"][0]["lessons"][0]["title"],
            "Task 12 Lesson",
        )
        self.assertNotIn("content", result["outline"][0]["lessons"][0])
        self.assertNotIn("video_url", result["outline"][0]["lessons"][0])
