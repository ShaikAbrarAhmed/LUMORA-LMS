import unittest
from unittest.mock import patch

import frappe

from lumora.permissions.roles import (
    require_role,
    require_admin,
    require_student,
    require_mentor,
)
from lumora.exceptions.exceptions import PermissionException


class TestRolePermissions(unittest.TestCase):

    @patch("lumora.permissions.roles.frappe.get_roles")
    def test_require_role_allows_correct_role(self, mock_get_roles):
        mock_get_roles.return_value = ["Student"]

        result = require_role("Student")

        self.assertTrue(result)

    @patch("lumora.permissions.roles.frappe.get_roles")
    def test_require_role_rejects_wrong_role(self, mock_get_roles):
        mock_get_roles.return_value = ["Student"]

        with self.assertRaises(PermissionException):
            require_role("System Manager")

    @patch("lumora.permissions.roles.frappe.get_roles")
    def test_require_admin_allows_admin(self, mock_get_roles):
        mock_get_roles.return_value = ["System Manager"]
    

        result = require_admin()

        self.assertTrue(result)

    @patch("lumora.permissions.roles.frappe.get_roles")
    def test_require_admin_rejects_non_admin(self, mock_get_roles):
        mock_get_roles.return_value = ["Student"]

        with self.assertRaises(PermissionException):
            require_admin()

    @patch("lumora.permissions.roles.frappe.get_roles")
    def test_require_student_allows_student(self, mock_get_roles):
        mock_get_roles.return_value = ["Student"]

        result = require_student()

        self.assertTrue(result)

    @patch("lumora.permissions.roles.frappe.get_roles")
    def test_require_student_rejects_non_student(self, mock_get_roles):
        mock_get_roles.return_value = ["Mentor"]

        with self.assertRaises(PermissionException):
            require_student()

    @patch("lumora.permissions.roles.frappe.get_roles")
    def test_require_mentor_allows_mentor(self, mock_get_roles):
        mock_get_roles.return_value = ["Mentor"]

        result = require_mentor()

        self.assertTrue(result)

    @patch("lumora.permissions.roles.frappe.get_roles")
    def test_require_mentor_rejects_non_mentor(self, mock_get_roles):
        mock_get_roles.return_value = ["Student"]

        with self.assertRaises(PermissionException):
            require_mentor()