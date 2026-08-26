# LUMORA Backend Conventions

## Authorization Order

Every protected LUMORA API should follow this order:

```text
Authentication
      ↓
Role authorization
      ↓
Ownership authorization (when applicable)
      ↓
Resource / field validation
      ↓
Action
Authentication and authorization checks should happen before resource-specific validation.
## 1. Authentication

Protected APIs must require an authenticated Frappe session.

The current user is identified using:

```python
frappe.session.user
LUMORA provides the shared helper:

get_current_user()

Guest users must not access protected APIs.

Public Authentication Endpoints

Authentication endpoints such as:

/method/lumora.api.auth.login

are different because the caller is not authenticated yet.

The login API must allow a Guest request so credentials can be checked and a session can be created.

The flow is:

Login request
      ↓
Authenticate credentials
      ↓
Create session

Protected APIs follow:

Existing session
      ↓
Authentication check
      ↓
Continue authorization

Then press:

```text
Ctrl + S

## 2. Role Authorization

After authentication, verify that the current user has the required role.

Use the shared helper:

```python
require_role("Student")
require_role("Mentor")
require_role("System Manager")
Role authorization should happen before ownership or resource validation.

Example:
require_role("Student")
If the authenticated user does not have the required role, the API must reject the request.

Role authorization answers:

Does this user have permission to use this type of resource?
## 3. Ownership Authorization

Ownership authorization answers:

> Does this specific resource belong to this user?

When an API receives a specific record identifier from the client, ownership must be checked before validating or modifying that record.

Use the shared helper:

```python
verify_owner(
    doctype,
    name,
    owner_field="owner",
    user=None
)

example
require_role("Student")

verify_owner(
    "Some DocType",
    record_name,
    owner_field="owner"
)

# Resource validation and action follow.
Ownership checks should happen after the role check but before field-level validation.

There is no reason to validate fields on a record that the caller is not authorized to access.
## 4. verify_owner() Behavior

The shared ownership helper follows this pattern:

```python
def verify_owner(doctype, name, owner_field="owner", user=None):
    user = user or get_current_user()

    if "Admin" in frappe.get_roles(user):
        return True

    owner = frappe.db.get_value(
        doctype,
        name,
        owner_field
    )

    if owner != user:
        frappe.throw(
            f"User {user} does not own this {doctype}: {name}",
            frappe.PermissionError
        )

    return True
    The helper:

1.Uses the supplied user when one is provided.
2.Otherwise uses the current session user.
3.Allows the intentional Admin bypass.
4.Reads the configured ownership field from the document.
5.Rejects access when the record belongs to another user.
## 5. Intentional Admin Bypass

The ownership helper intentionally allows a user with the `Admin` role to bypass the ownership check:

```python
if "Admin" in frappe.get_roles(user):
    return True
   This bypass is intentional and documented.

It must not be treated as an accidental security exception.

The expected behavior is:
 Normal user
      ↓
Ownership must match
      ↓
Allow / reject

Admin
      ↓
Intentional ownership bypass
      ↓
Allow
Documenting this bypass makes the authorization behavior explicit and reviewable during security reviews.
## 6. "My Resource" APIs

Not every API needs an explicit `verify_owner()` call.

APIs such as:

```text
get_my_profile
update_my_profile
operate only on the currently authenticated user's own resource.

These APIs must identify the user using:

frappe.session.user

The resource is then fetched using that user identity.
For example:

{"user": frappe.session.user}

The client must not provide:

profile_id
profile_name
another_user_id

to select another user's resource.

This is called implicit ownership.
The API design itself prevents the caller from selecting another user's profile.
## 7. Resource-ID APIs vs "My Resource" APIs

There are two valid ownership patterns.

### Pattern A — Resource-ID API

Use this when the client supplies a specific record identifier.

```text
Authentication
      ↓
Role
      ↓
verify_owner()
      ↓
Resource / field validation
      ↓
Action

Example:
require_role("Student")

verify_owner(
    "Assignment",
    assignment_name,
    owner_field="owner"
)

# Validate fields
# Perform action
Pattern B — "My Resource" API

Use this when the API always operates on the current user's own resource.
Authentication
      ↓
Current session user
      ↓
Fetch current user's resource
      ↓
Resource / field validation
      ↓
Action
example:
user = frappe.session.user

# Find the resource belonging to this user.
## 8. LUMORA Profile API Convention

The LUMORA profile APIs use the "My Resource" pattern:

```text
/method/lumora.api.profile.get_my_profile
/method/lumora.api.profile.update_my_profile
They operate on:
frappe.session.user

and resolve the associated profile using the profile's user field:
{"user": frappe.session.user}
The client does not provide a profile ID.

Therefore, these APIs do not need a separate client-supplied ownership identifier.

Ownership is implicit through the authenticated session.
hen paste only this:

## 9. Field Validation

After authentication, role authorization, and ownership authorization, validate the fields being accessed or modified.

Update APIs must use an explicit allowlist of editable fields.

For the LUMORA profile APIs, the editable fields are:

```text
bio
phone
avatar

The following fields are not client-editable:

cohort
roles
email
user

Unknown fields must also be rejected.

For example, this request should fail:

{
  "bio": "Updated bio",
  "cohort": "Batch-01"
}

because cohort is not an editable student profile field.

The API should return an explicit validation error instead of silently ignoring cohort.
## 10. Why Allowlisting Is Required

Use an allowlist instead of a blocklist.

### Avoid this approach

```text
Allow everything except:
- roles
- email
- cohort
this becomes unsafe when a new sensitive field is added and the blocklist is not updated.

Preferred approach
Allow only:
- bio
- phone
- avatar

Any field not explicitly allowed is rejected.

This fails closed by default.

New fields therefore remain protected until they are deliberately approved for editing.

## 11. Authorization and Validation Order

Do not validate request fields before authorization.

The preferred sequence is:

```text
1. Authentication
2. Role authorization
3. Ownership authorization, if applicable
4. Resource selection / existence
5. Field validation
6. Action

Example:

require_role("Student")

verify_owner(
    "Assignment",
    name,
    owner_field="owner"
)

# Only now validate submitted fields.

This prevents unnecessary validation of resources that the caller cannot access.

12. API Security Examples
Student-Owned Resource
@frappe.whitelist()
def update_assignment(name, title):

    require_role("Student")

    verify_owner(
        "Assignment",
        name,
        owner_field="owner"
    )

    # Validate title
    # Update assignment

Flow:

Authenticated?
      ↓
Student role?
      ↓
Owns assignment?
      ↓
Is title valid?
      ↓
Update
My Profile
@frappe.whitelist()
def update_my_profile(**data):

    user = get_current_user()

    # Find profile belonging to current user.
    # Validate allowed fields.
    # Update profile.

Flow:

Authenticated?
      ↓
Current session user
      ↓
Find own profile
      ↓
Validate allowed fields
      ↓
Update

No profile ID is accepted from the client.

3. Code Review Checklist

For every new LUMORA API, reviewers should verify:

 Authentication is required where appropriate.
 Guest users cannot access protected APIs.
 Required role is checked after authentication.
 Ownership is checked when the client supplies a specific resource identifier.
 verify_owner() is used for explicit ownership checks.
 "My resource" APIs use frappe.session.user instead of a client-supplied resource ID.
 Ownership checks occur before field-level validation.
 The Admin ownership bypass is intentional and documented.
 Update APIs use an explicit allowlist of editable fields.
 Protected fields are rejected.
 Unknown fields are rejected with a validation error.
 Client-controlled identifiers cannot bypass authorization.
 Security-sensitive behavior is documented for code review.
 14. Team Convention

From Day 8 onward, LUMORA backend APIs should follow:

AUTH
 ↓
ROLE
 ↓
OWNERSHIP (when applicable)
 ↓
RESOURCE
 ↓
FIELD VALIDATION
 ↓
ACTION

The ownership mechanism depends on the API design.

For APIs where the client provides a resource identifier:

Resource ID supplied by client
      ↓
Use verify_owner()

For "My Resource" APIs:

My Resource API
      ↓
Use frappe.session.user
      ↓
Fetch only the current user's resource

Both patterns are valid, but the choice must be intentional, secure, and reviewable.
