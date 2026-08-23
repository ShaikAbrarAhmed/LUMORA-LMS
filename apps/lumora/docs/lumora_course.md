# Lumora Course

## Overview

`Lumora Course` stores the core information for a course in the Lumora learning platform.

- **Module:** `lumora`
- **Naming:** By fieldname (`slug`)
- **Naming field:** `slug`
- **Track Changes:** Enabled
- **Web-page search indexing:** Enabled

## Fields

| Field | Type | Required | Details |
|---|---|---|---|
| `title` | Data | Yes | Course title |
| `slug` | Data | Yes | Unique course identifier; used for naming |
| `description` | Text Editor | No | Course description |
| `category` | Select | No | Category field; options are not defined in the current DocType JSON |
| `status` | Select | Yes | `Draft` or `Published` |
| `mentor` | Link | Yes | Links to `User` |
| `thumbnail` | Attach Image | No | Course thumbnail |

## Relationships

- `mentor` links to the Frappe `User` DocType.
- Other Lumora DocTypes reference `Lumora Course`, including `Lumora Chapter`, `Lumora Batch`, and `Lumora Enrollment`.

## Permissions

The current DocType definition grants create, read, write, delete, export, print, report, email, and share permissions to the **System Manager** role.

## Notes

- `slug` is required and unique.
- `title` is required.
- `status` defaults are not specified in the current JSON definition.
- `category` has no options specified in the current JSON definition.
