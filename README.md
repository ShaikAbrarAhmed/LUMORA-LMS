# LUMORA LMS

LUMORA LMS is a modern, enterprise-grade Learning Management System built using a robust, decoupled architecture combining a Vue 3/Vite frontend with a Python-based Frappe backend.

## Tech Stack

* **Frontend:** Vue 3, Vite, TypeScript, Pinia (State Management), Vanilla CSS / Custom Styling
* **Backend:** Python, Frappe Framework, PostgreSQL, Redis
* **DevOps/Infrastructure:** Docker, Docker Compose, Nginx, VS Code Configs

## Repository Architecture

```text
LUMORA LMS/
├── frontend/             # Vue.js 3 + TypeScript Client App
├── apps/                 # Backend apps (Frappe custom app directory)
│   └── lumora/           # Lumora core Frappe application package
├── docker/               # Docker configurations & Custom Dockerfiles
├── nginx/                # Nginx proxy & static asset configurations
├── docs/                 # Documentation portal
├── scripts/              # Setup, database migration, and dev utilities
├── .github/              # GitHub Action templates & issue config
├── docker-compose.yml    # Main docker compose orchestration configuration
└── README.md             # This description file
```

## Get Started

### Prerequisites

* Node.js >= 18
* Python >= 3.10
* Docker & Docker Compose
* Git

### Local Setup

#### 1. Backend Setup
Instructions on setting up Frappe and database configurations.

```bash
# Clone the repository
git clone <repo-url>
cd "LUMORA LMS"

# Set up backend container or bench environment
# More details in backend documentation
```

#### 2. Frontend Setup
Run the development environment for the Vue 3 application.

```bash
cd frontend
npm install
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
