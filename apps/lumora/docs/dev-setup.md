 ## Repository Structure

This project uses two directories during development:

- `~/frappe-bench` – Frappe Bench environment used to run the backend (MariaDB, Redis, Bench, LMS site).
- `LUMORA-LMS/` – Team project repository containing the custom Lumora application and frontend.

The commands in this guide switch between these directories when required.
 
 Local Development Setup

## Overview

This document explains how to set up the LMS project locally and verify that the development environment is working correctly.

---

## Prerequisites

Ensure the following software is installed:

- Ubuntu (WSL)
- Python
- Node.js
- Yarn
- MariaDB
- Redis
- Bench CLI
- Git

---

## Project Location

```bash
cd ~/frappe-bench
```

---

## Verify the Site

```bash
bench --site lumora.localhost list-apps
```

Expected apps:

- frappe
- payments
- lms

---

## Enable Developer Mode

```bash
bench --site lumora.localhost set-config developer_mode 1
```

Verify:

```bash
bench --site lumora.localhost show-config
```

Expected:

```
developer_mode    1
```

---

## Configure CORS

The frontend uses a Vite development server.

Configure an explicit origin:

```bash
bench --site lumora.localhost set-config allow_cors http://localhost:8080
```

Verify:

```bash
bench --site lumora.localhost show-config
```

Expected:

```
allow_cors    http://localhost:8080
```

> Do not use `*` because cookie-based authentication with credentials requires an explicit origin.

---



Replace it with:

````markdown
## Install Frontend Dependencies

```bash
cd frontend
yarn install

---

## Start the Frontend

```bash
npm run dev
```

Expected:

```
Local: http://localhost:8080
```

---

## Start the Backend

From the Bench directory:

```bash
cd ~/frappe-bench
bench start
```

Expected services:

- Redis Cache
- Redis Queue
- Worker
- Scheduler
- SocketIO
- Web Server

---

## Verify Local Site

Open:

```
http://127.0.0.1:8000
```

The Frappe login page should load.

---

## Verification Checklist

- [ ] MariaDB running
- [ ] Redis running
- [ ] Site loads on port 8000
- [ ] Frontend runs on port 8080
- [ ] Developer mode enabled
- [ ] allow_cors configured as http://localhost:8080