# Lumora Chapter

## Overview

`Lumora Chapter` represents a chapter within a Lumora course.

- **Module:** `lumora`
- **Track Changes:** Enabled
- **Web-page search indexing:** Enabled

## Fields

| Field | Type | Required | Details |
|---|---|---|---|
| `course` | Link | Yes | Links to `Lumora Course` |
| `title` | Data | Yes | Chapter title |
| `idx` | Int | Yes | Chapter ordering/index value |

## Relationships

- `course` links each chapter to a `Lumora Course`.
- `Lumora Lesson` links to this DocType through its `chapter` field.

## Permissions

The current DocType definition grants create, read, write, delete, export, print, report, email, and share permissions to the **System Manager** role.

## Notes

- `course` is required.
- `title` is required.
- `idx` is required and is used to store the chapter index/order.
