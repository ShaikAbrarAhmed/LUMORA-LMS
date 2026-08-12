import frappe


DEV_USERS = [
    {
        "email": "student@lumora.local",
        "first_name": "Lumora",
        "last_name": "Student",
        "role": "Student",
        "password": "LumoraDev123!",
    },
    {
        "email": "mentor@lumora.local",
        "first_name": "Lumora",
        "last_name": "Mentor",
        "role": "Mentor",
        "password": "LumoraDev123!",
    },
    {
        "email": "admin@lumora.local",
        "first_name": "Lumora",
        "last_name": "Admin",
        "role": "Admin",
        "password": "LumoraDev123!",
    },
]


def seed_dev_users():
    for user_data in DEV_USERS:
        email = user_data["email"]

        if frappe.db.exists("User", email):
            user = frappe.get_doc("User", email)
        else:
            user = frappe.get_doc(
                {
                    "doctype": "User",
                    "email": email,
                    "first_name": user_data["first_name"],
                    "last_name": user_data["last_name"],
                    "enabled": 1,
                    "send_welcome_email": 0,
                    "new_password": user_data["password"],
                }
            )
            user.insert(ignore_permissions=True)

        existing_roles = {role.role for role in user.roles}

        if user_data["role"] not in existing_roles:
            user.append("roles", {"role": user_data["role"]})
            user.save(ignore_permissions=True)

        print(f"Seeded {email} with role {user_data['role']}")

    frappe.db.commit()
