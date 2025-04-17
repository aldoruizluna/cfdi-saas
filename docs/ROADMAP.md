# Project Roadmap: FinMex Suite (SaaS Invoicing & Expense Management)

## Introduction

This document outlines the high-level development roadmap for the FinMex Suite platform. It breaks down the project into logical phases, starting with the Minimum Viable Product (MVP) and progressing towards the full feature set described in the main `README.md` and `docs/SPECIFICATION.md`.

The roadmap provides a guide for development priorities but is intended to be a living document, subject to refinement based on ongoing development, feedback, and strategic decisions.

## Phase 1: Core MVP - Foundational Setup & Basic Invoicing

*   **Goal:** Establish the core infrastructure, user authentication, multi-tenancy foundations, and the ability to create, read, update, and delete (CRUD) basic CFDI 4.0 invoice data (without PAC integration initially).
*   **Key Tasks:**
    1.  **Infrastructure Setup (Local & Staging):**
        *   Finalize Docker Compose setup (`docker-compose.yml`) for all core services (backend API, frontend dev server, PostgreSQL DB).
        *   Set up basic Infrastructure as Code (IaC) using Terraform (`infrastructure/`) for a Staging environment (e.g., AWS VPC, basic Kubernetes cluster/ECS, RDS for PostgreSQL).
        *   Implement a basic CI/CD pipeline (e.g., GitHub Actions in `.github/workflows/`) to build, test, and deploy the backend and frontend to the Staging environment upon code merges.
    2.  **Backend (NestJS - `backend/`):**
        *   Implement User Authentication & Authorization (e.g., JWT-based). Secure API endpoints.
        *   Implement basic Tenant Management (models, APIs for isolating tenant data).
        *   Develop core CFDI models (Issuer, Receiver, Concepts, Invoice) aligned with CFDI 4.0 requirements.
        *   Implement API endpoints (`/invoices`, `/issuers`, `/receivers`, etc.) for CRUD operations on Invoice data.
        *   Set up basic structured logging and health check endpoints.
        *   Establish database migrations.
    3.  **Frontend (React/Vite - `frontend/`):**
        *   Set up project structure, routing (e.g., React Router), and basic UI layout/theme (e.g., using a component library like Material UI or Chakra UI).
        *   Implement Login/Registration pages and integrate with backend authentication.
        *   Create a basic authenticated dashboard view.
        *   Develop Invoice creation/list/view/edit components.
        *   Integrate frontend components with backend APIs for managing invoice data.
    4.  **Documentation (`docs/`):**
        *   Document setup procedures for local development (`docs/developer-guides/local-setup.md`).
        *   Document the Staging environment setup and deployment process.
        *   Start documenting API endpoints using OpenAPI/Swagger, integrated with NestJS.

## Phase 2: MVP Enhancement - PAC Integration & Core Expense

*   **Goal:** Enable actual CFDI `timbrado` (stamping) and cancellation via a selected PAC (Proveedor Autorizado de Certificación) provider. Introduce basic expense management features (manual entry).
*   **Key Tasks:**
    1.  **Backend:**
        *   Select and integrate with a chosen PAC provider's API for CFDI stamping (`timbrado`) and cancellation requests.
        *   Implement secure management and usage of CSD (Certificado de Sello Digital) certificates required for stamping.
        *   Develop basic Expense models (e.g., Expense Report, Expense Item) and corresponding CRUD API endpoints.
        *   Implement background job processing (e.g., using BullMQ with Redis, or RabbitMQ) for asynchronous tasks like sending invoice emails or notifications.
        *   Generate basic PDF representations of the CFDI.
    2.  **Frontend:**
        *   Add UI elements to manage CSD certificates (upload/view).
        *   Add UI elements to trigger PAC stamping and cancellation actions on invoices.
        *   Display stamped invoice status (`timbrado`, `cancelado`), UUID, and provide options to download generated XML and PDF.
        *   Develop basic Expense entry forms and a list view to manage manually entered expenses.
        *   Integrate expense components with backend APIs.
    3.  **Infrastructure:**
        *   Refine Staging environment based on Phase 1 learnings (monitoring, logging, alerting).
        *   Implement secure secrets management (e.g., AWS Secrets Manager, HashiCorp Vault) for PAC credentials and other sensitive data.

## Phase 3: Automation & Advanced Features

*   **Goal:** Introduce automation capabilities (MCP - Minimal Computing Platform style endpoints), enhance expense management (OCR, workflows), and add reporting/analytics.
*   **Key Tasks:**
    1.  **Backend:**
        *   Develop the Automation & Integration Module: Design and implement secure MCP endpoints for triggering actions (e.g., creating invoices) via platforms like n8n.
        *   Implement OCR processing for expense receipts: Integrate with a 3rd party OCR service or library to extract data from uploaded receipt images.
        *   Develop configurable approval workflows for expenses.
        *   Implement more detailed reporting and analytics features (consider using a suitable database like MongoDB or a data warehousing solution if needed).
        *   Develop public REST APIs and Webhooks for external system integrations (e.g., ERPs).
    2.  **Frontend:**
        *   UI for managing automation connections/credentials and viewing logs/status.
        *   UI for submitting expenses via OCR, managing approval workflows, and viewing expense reports.
        *   Develop reporting and analytics dashboards.
        *   Consider a mobile-friendly interface or PWA features for expense capture on the go.
    3.  **Infrastructure:**
        *   Define, provision, and configure the Production environment infrastructure based on Staging.
        *   Implement robust monitoring, logging, alerting, and backup strategies for Production.
        *   Perform load testing and optimize infrastructure scaling.

## Phase 4: Ongoing Improvement & Expansion

*   **Goal:** Continuous refinement based on user feedback, market changes (e.g., SAT regulations), security best practices, and strategic expansion.
*   **Key Tasks (Examples):**
    *   Integrations with specific third-party ERPs or accounting software.
    *   Advanced analytics, business intelligence insights, and customizable reports.
    *   Support for additional CFDI types (e.g., Payroll/Nomina, Payments/Pago).
    *   Enhanced multi-tenancy features (custom branding, roles/permissions).
    *   Performance optimization, database tuning, and ongoing security hardening.
    *   Refinement of CI/CD processes for faster, more reliable deployments.
    *   Exploration of additional modules based on market demand.

---

*This roadmap is subject to change. Last Updated: [Current Date]* 