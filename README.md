---
File Path: ./README.md
---
# SaaS Invoicing & Expense Management Platform (Codename: FinMex Suite - Example)

## Overview

This repository contains the source code for the cloud-based SaaS platform providing electronic invoicing (CFDI 4.0 compliant), expense management, and automation integration capabilities (MCP) for the Mexican market.

The platform is designed as a multi-tenant solution using a microservices architecture. It aims to simplify financial administration for businesses operating in Mexico.

Refer to the [Full Software Specification](./docs/SPECIFICATION.md) (assuming you place the original spec document here) for complete details.

## Key Features (Full Scope)

*   **Invoicing Module (CFDI Manager):** CFDI 4.0 generation, validation, PAC `timbrado`, cancellation, document storage (XML/PDF).
*   **Expense Management Module:** Manual entry, mobile capture with OCR, configurable approval workflows, reporting & analytics.
*   **Automation & Integration Module:** MCP endpoints for n8n/automation platforms, REST APIs, Webhooks, third-party ERP integrations.

## Technology Stack (Planned - Example)

*   **Frontend:** React / TypeScript / Vite
*   **Backend:** Node.js / TypeScript / NestJS (adjust per service as needed)
*   **Databases:** PostgreSQL (Transactional), MongoDB (Logging/Analytics)
*   **Infrastructure:** AWS / Kubernetes / Terraform
*   **Messaging:** RabbitMQ (Async tasks/notifications)
*   **API Gateway:** Kong / Custom Go service (Example)

## Folder Structure

*   `backend/`: Contains all microservices and the API Gateway.
*   `frontend/`: Contains the SPA web application.
*   `infrastructure/`: Infrastructure as Code definitions (Terraform).
*   `docs/`: All project documentation (architecture, API specs, guides).
*   `scripts/`: Utility scripts for development and operations.
*   `shared/`: Optional directory for code shared across services/apps.
*   `.github/`: CI/CD workflow definitions (GitHub Actions).

Refer to the `README.md` file within each directory for specific details.

## Environment Management

### 1. Local Development (Docker Compose)

This environment uses Docker Compose to manage the backend, frontend, and database services.

**Prerequisites:**
*   Docker Desktop installed and running.
*   Git installed.

**Setup:**
1.  Clone the repository: `git clone <repository-url>`
2.  Navigate to the project directory: `cd finmex-suite`
3.  Ensure `.env.dev` (for backend) and `.env.development` (for frontend) exist with the necessary environment variables (refer to `docker-compose.yml` for required vars). **Do not commit these files.**

**Spin Up:**
*   Start all services in detached mode:
    ```bash
    docker-compose up -d
    ```
*   If backend or frontend dependencies (`requirements.txt` or `package.json`) have changed, rebuild the images:
    ```bash
    docker-compose up -d --build
    ```

**Access:**
*   Frontend: `http://localhost:3000`
*   Backend API: `http://localhost:8000`
*   Django Admin: `http://localhost:8000/admin/` (Requires creating a superuser first: `docker-compose exec backend python manage.py createsuperuser`)

**Running Management Commands:**
*   Use `docker-compose exec` to run commands inside a service container. Example:
    ```bash
    # Run Django migrations
    docker-compose exec backend python manage.py migrate

    # Create Django superuser
    docker-compose exec backend python manage.py createsuperuser

    # Install a new backend dependency
    docker-compose exec backend pip install <package-name>
    # (Remember to add it to requirements.txt and rebuild if needed)

    # Install a new frontend dependency
    docker-compose exec frontend npm install <package-name>
    # (Remember to add it to package.json and rebuild if needed)
    ```

**Take Down:**
*   Stop and remove containers/networks (data volume persists):
    ```bash
    docker-compose down
    ```
*   Stop, remove containers/networks, **AND remove data volumes (Deletes DB!)**:
    ```bash
    docker-compose down -v
    ```
*   Stop containers without removing them:
    ```bash
    docker-compose stop
    ```
*   Restart stopped containers:
    ```bash
    docker-compose start
    ```

**Viewing Logs:**
*   View logs for all services: `docker-compose logs`
*   Follow logs in real-time: `docker-compose logs -f`
*   View logs for a specific service: `docker-compose logs backend`

### 2. Staging Environment

*(Placeholder: Document infrastructure, deployment steps, environment variable management, and access URLs for the staging environment once defined.)*

**Spin Up:**
*   `TODO`

**Take Down:**
*   `TODO`

### 3. Production Environment

*(Placeholder: Document infrastructure, deployment steps (preferably CI/CD), secrets management, and access URLs for the production environment once defined.)*

**Spin Up:**
*   `TODO`

**Take Down:**
*   `TODO`

## Getting Started (Local Development)

1.  **Prerequisites:** Node.js (vX.Y.Z), Docker, Docker Compose, [Any other specific tools like Terraform CLI, AWS CLI].
2.  **Clone:** `git clone [repository-url]`
3.  **Navigate:** `cd [repository-directory]`
4.  **Setup:** Run `scripts/setup-dev.sh` (Ensure this script exists and is executable). This should install dependencies and set up initial configurations.
5.  **Run:** `docker-compose up -d` (Based on the root `docker-compose.yml`). This should start all backend services, databases, and potentially the frontend dev server.

See the [Local Development Setup Guide](./docs/developer-guides/local-setup.md) for detailed instructions, environment variable setup, and troubleshooting.

## Contribution

Interested in contributing? Please read our [Contribution Guidelines](./docs/developer-guides/contribution-guidelines.md).

## License

This project is licensed under the terms of the [LICENSE](./LICENSE) file.
