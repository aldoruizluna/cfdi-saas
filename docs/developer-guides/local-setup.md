---
File Path: ./docs/developer-guides/local-setup.md
---
# Local Development Environment Setup

This guide details how to set up the complete development environment for the SaaS platform on your local machine.

## Prerequisites

Ensure you have the following software installed:

1.  **Git:** For version control ([Download Git](https://git-scm.com/downloads)).
2.  **Node.js:** Use the version specified in the root `.nvmrc` file or `package.json` (e.g., v18.x). We recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage Node.js versions.
    *   Install nvm: Follow instructions on the nvm GitHub page.
    *   Install and use the correct Node version: `nvm install && nvm use` in the project root.
3.  **Docker:** For running services in containers ([Install Docker Desktop](https://www.docker.com/products/docker-desktop/)). Ensure Docker engine and Docker Compose are running.
4.  **(Optional) Cloud Provider CLI:** E.g., AWS CLI, Azure CLI, gcloud CLI, if interacting directly with cloud resources not handled by Terraform/local emulators.
5.  **(Optional) Terraform CLI:** If you need to manage infrastructure locally ([Download Terraform](https://developer.hashicorp.com/terraform/downloads)).
6.  **IDE:** A code editor like VS Code is recommended.

## Setup Steps

1.  **Clone the Repository:**
    ```bash
    git clone [repository-url]
    cd [repository-directory]
    ```

2.  **Install Root Dependencies (if applicable):**
    *   If using a monorepo manager like Lerna or Nx at the root, follow its specific installation steps (e.g., `npm install` or `yarn install` at the root).
    *   If not, dependencies are usually managed within each service/app (`backend/services/*`, `frontend/`).

3.  **Configure Environment Variables:**
    *   Most services and the frontend require environment variables for configuration (database connections, API keys, secrets, etc.).
    *   Look for `.env.example` files in the root, `backend/services/*`, and `frontend/` directories.
    *   **Copy** each `.env.example` to a corresponding `.env` file (e.g., `backend/services/invoice-service/.env.example` -> `backend/services/invoice-service/.env`).
    *   **Edit** the `.env` files and fill in the necessary values.
        *   For local development, database hosts will often be the service names defined in `docker-compose.yml` (e.g., `postgres`, `rabbitmq`).
        *   Use **sandbox/test credentials** for external services like the PAC provider. **Never commit real production secrets.**
        *   Set frontend API URL (`VITE_API_BASE_URL` in `frontend/.env`) to point to the local API Gateway (e.g., `http://localhost:8080/api`).

4.  **Run Utility Setup Script (if available):**
    *   Check if a script like `scripts/setup-dev.sh` exists. If so, make it executable (`chmod +x scripts/setup-dev.sh`) and run it (`./scripts/setup-dev.sh`). This script might automate dependency installation within each service and other setup tasks.
    *   If no script exists, you may need to manually `npm install` (or `yarn install`) inside each service directory (`backend/services/*`) and the `frontend/` directory.

5.  **Build Docker Images (Optional but Recommended):**
    *   You can pre-build the images defined in the `docker-compose.yml` file for faster startup later:
      ```bash
      docker-compose build
      ```

6.  **Start Services with Docker Compose:**
    *   From the **root directory** of the project:
      ```bash
      docker-compose up -d
      ```
    *   This command reads the `docker-compose.yml` file, pulls or builds the necessary images, and starts all defined services (databases, message broker, backend microservices, API Gateway) in detached mode (`-d`).

7.  **Verify Services are Running:**
    *   Check the status of the containers: `docker-compose ps`
    *   Check the logs for specific services: `docker-compose logs -f [service-name]` (e.g., `docker-compose logs -f invoice-service`). Look for any error messages during startup.

8.  **Run Frontend Development Server:**
    *   Navigate to the frontend directory: `cd frontend`
    *   Start the dev server: `npm run dev` (or `yarn dev`)
    *   Open your browser to the local URL provided (e.g., `http://localhost:5173`).

## Common Issues & Troubleshooting

*   **Port Conflicts:** If a port required by Docker Compose (e.g., 5432 for Postgres, 8080 for API Gateway) is already in use, `docker-compose up` will fail. Stop the conflicting service or change the port mapping in `docker-compose.yml` (e.g., map external port 5433 to internal 5432).
*   **Environment Variables:** Missing or incorrect environment variables are a common source of errors. Double-check your `.env` files in each service.
*   **Database Migrations:** The initial `docker-compose up` might create databases, but you may need to run database migrations separately. Check the README of services like `invoice-service` or `expense-service` for migration commands (often run via `docker-compose exec [service-name] [migration-command]`).
*   **Docker Networking:** Ensure services can communicate with each other using the service names defined in `docker-compose.yml`. Docker Compose typically sets up a default network.
*   **Build Failures:** Check logs during `docker-compose build` or `docker-compose up` for errors related to package installation or build steps within Dockerfiles.

## Stopping the Environment

*   To stop all running services defined in `docker-compose.yml`:
    ```bash
    docker-compose down
    ```
*   To stop services and remove associated volumes (use with caution - **deletes database data**):
    ```bash
    docker-compose down -v
    ```