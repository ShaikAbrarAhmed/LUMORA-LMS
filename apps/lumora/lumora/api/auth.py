import frappe


@frappe.whitelist(allow_guest=True)
def login(usr, pwd):
    """Authenticate a user and create a Frappe session."""

    login_manager = frappe.auth.LoginManager()
    login_manager.authenticate(user=usr, pwd=pwd)
    login_manager.post_login()

    return {
        "user": frappe.session.user
    }


@frappe.whitelist()
def get_session_user():
    """Return the current Frappe session user."""

    return {
        "user": frappe.session.user
    }


@frappe.whitelist()
def logout():
    """Log out the current user."""

    frappe.local.login_manager.logout()

    return {
        "message": "Logged out successfully"
    }
