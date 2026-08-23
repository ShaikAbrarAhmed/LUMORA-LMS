# Lumora Batch

## Overview

`Lumora Batch` represents a learning batch associated with a Lumora course.

- **Module:** `lumora`
- **Title field:** `batch_name`
- **Track Changes:** Enabled
- **Web-page search indexing:** Enabled

## Fields

| Field | Type | Required | Details |
|---|---|---|---|
| `batch_name` | Data | Yes | Batch name; used as the title field |
| `course` | Link | Yes | Links to `Lumora Course` |
| `mentor` | Link | No | Links to `User` |

## Relationships

- `course` links the batch to a `Lumora Course`.
- `mentor` optionally links the batch to a Frappe `User`.
- `Lumora Batch Student` links students to this batch through its `batch` field.

## Permissions

The current DocType definition grants create, read, write, delete, export, print, report, email, and share permissions to the **System Manager** role.

## Notes

- `batch_name` is required and is configured as the title field.
- `course` is required.
- `mentor` is optional.
