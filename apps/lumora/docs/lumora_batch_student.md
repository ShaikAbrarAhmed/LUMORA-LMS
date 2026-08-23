# Lumora Batch Student

## Overview

`Lumora Batch Student` represents the association between a student and a Lumora batch.

- **Module:** `lumora`
- **Track Changes:** Enabled
- **Web-page search indexing:** Enabled

## Fields

| Field | Type | Required | Details |
|---|---|---|---|
| `batch` | Link | Yes | Links to `Lumora Batch` |
| `student` | Link | Yes | Links to `User` |

## Relationships

- `batch` links the record to a `Lumora Batch`.
- `student` links the record to a Frappe `User`.

## Permissions

The current DocType definition grants create, read, write, delete, export, print, report, email, and share permissions to the **System Manager** role.

## Notes

- Both `batch` and `student` are required.
- The DocType is used to associate a student with a batch.
