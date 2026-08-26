# Lumora Enrollment

## Overview

`Lumora Enrollment` represents a student's enrollment in a Lumora course.

- **Module:** `lumora`
- **Track Changes:** Enabled
- **Web-page search indexing:** Enabled

## Fields

| Field | Type | Required | Details |
|---|---|---|---|
| `student` | Link | Yes | Links to `User` |
| `course` | Link | Yes | Links to `Lumora Course` |
| `enrolled_on` | Datetime | No | Date and time of enrollment |
| `status` | Select | Yes | `Active`, `Completed`, or `Revoked` |

## Relationships

- `student` links the enrollment to a Frappe `User`.
- `course` links the enrollment to a `Lumora Course`.

## Status

The available status values are:

- `Active`
- `Completed`
- `Revoked`

The default status is `Active`.

## Permissions

The current DocType definition grants create, read, write, delete, export, print, report, email, and share permissions to the **System Manager** role.

## Notes

- Both `student` and `course` are required.
- `enrolled_on` is optional.
- `status` is required and defaults to `Active`.
