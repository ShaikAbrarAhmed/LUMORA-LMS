# Lumora Lesson

## Overview

`Lumora Lesson` represents a lesson within a Lumora chapter.

- **Module:** `lumora`
- **Track Changes:** Enabled
- **Web-page search indexing:** Enabled

## Fields

| Field | Type | Required | Details |
|---|---|---|---|
| `chapter` | Link | Yes | Links to `Lumora Chapter` |
| `title` | Data | Yes | Lesson title |
| `content` | Text Editor | No | Lesson content |
| `video_url` | Data | No | URL for lesson video |
| `idx` | Int | Yes | Lesson ordering/index value |

## Relationships

- `chapter` links each lesson to a `Lumora Chapter`.
- Through the chapter relationship, lessons belong to a `Lumora Course`.

## Permissions

The current DocType definition grants create, read, write, delete, export, print, report, email, and share permissions to the **System Manager** role.

## Notes

- `chapter` is required.
- `title` is required.
- `content` is optional.
- `video_url` is optional.
- `idx` is required and stores the lesson index/order.
