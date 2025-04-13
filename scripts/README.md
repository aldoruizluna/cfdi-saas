---
File Path: ./scripts/README.md
---
# Utility Scripts

This directory contains various utility and automation scripts used during development, testing, building, or operational tasks for the platform.

## Scripts

*   **`setup-dev.sh`:**
    *   **Purpose:** Automates the initial setup of the local development environment after cloning the repository.
    *   **Actions:** Might include installing dependencies in all services (`npm install`), copying `.env.example` files, potentially running initial database migrations, or other bootstrapping tasks.
    *   **Usage:** `bash ./scripts/setup-dev.sh` (Run from the project root).
*   **`build-all.sh`:**
    *   **Purpose:** Builds all necessary artifacts for deployment (e.g., Docker images for backend services, static build for frontend). Useful for CI or manual build processes.
    *   **Actions:** Likely runs `docker build` for each service defined in `backend/services/` and `npm run build` in the `frontend/` directory.
    *   **Usage:** `bash ./scripts/build-all.sh`
*   **`run-tests.sh`:**
    *   **Purpose:** Executes all automated test suites across the project (unit, integration, potentially E2E). Useful for CI checks or local validation before committing.
    *   **Actions:** Navigates into relevant directories (`backend/services/*`, `frontend/`) and runs their respective test commands (`npm test`, `npm run test:int`, etc.).
    *   **Usage:** `bash ./scripts/run-tests.sh`
*   **(Add other scripts as needed)**
    *   `run-lint.sh`: Runs linters across all relevant codebases.
    *   `db-migrate.sh`: Helper script to run database migrations for a specific service.
    *   `deploy-staging.sh`: Example script for triggering a deployment to the staging environment.

## Usage Notes

*   Ensure scripts are executable (`chmod +x scripts/[script-name].sh`).
*   Run scripts from the project's root directory unless otherwise specified within the script or its documentation.
*   Scripts should generally be written to be idempotent where possible (running them multiple times doesn't cause adverse effects).
*   Use environment variables for configuration within scripts rather than hardcoding values.