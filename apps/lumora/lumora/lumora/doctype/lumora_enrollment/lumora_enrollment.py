# Copyright (c) 2026, Lumora LMS Team and contributors
# For license information, please see license.txt

from frappe.model.document import Document
from frappe.utils import now_datetime


class LumoraEnrollment(Document):
    def before_insert(self):
        if not self.enrolled_on:
            self.enrolled_on = now_datetime()