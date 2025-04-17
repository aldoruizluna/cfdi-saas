---
File Path: ./docs/README.md
---
# Project Documentation Hub

Welcome to the central documentation repository for the **SaaS Invoicing & Expense Management Platform**.

This directory contains essential information for understanding, developing, using, and maintaining the platform.

## Documentation Areas

*   **`README.md` (This file):** Provides an overview and index of the documentation.
*   **`ROADMAP.md`:** [`ROADMAP.md`](./ROADMAP.md): Outlines the planned development phases and milestones for the project.
*   **`SPECIFICATION.md`:** (You should place the original requirements document here) The detailed functional and technical software specification.
*   **`architecture/`:** Contains high-level architecture diagrams, decisions (ADRs), and descriptions of the system's structure.
    *   [`architecture/README.md`](./architecture/README.md): Overview of architectural documentation.
*   **`api/`:** Documentation for all programmatic interfaces.
    *   [`api/README.md`](./api/README.md): Overview of API documentation.
    *   [`api/openapi-spec.yaml`](./api/openapi-spec.yaml): OpenAPI (Swagger) specification for the external RESTful APIs exposed by the API Gateway.
    *   [`api/mcp-spec.md`](./api/mcp-spec.md): Detailed specification for the Modular Connection Protocol (MCP) endpoints used for automation integration.
*   **`user-guides/`:** Manuals and guides for end-users of the platform.
    *   [`user-guides/README.md`](./user-guides/README.md): Index of user guides.
    *   [`user-guides/invoicing.md`](./user-guides/invoicing.md): How to create, manage, and cancel invoices.
    *   [`user-guides/expense-management.md`](./user-guides/expense-management.md): How to submit and manage expenses.
*   **`developer-guides/`:** Information specifically for developers working on the platform.
    *   [`developer-guides/README.md`](./developer-guides/README.md): Index of developer guides.
    *   [`developer-guides/local-setup.md`](./developer-guides/local-setup.md): Instructions for setting up a local development environment.
    *   [`developer-guides/coding-standards.md`](./developer-guides/coding-standards.md): Code style, conventions, and best practices.
    *   [`developer-guides/contribution-guidelines.md`](./developer-guides/contribution-guidelines.md): How to contribute to the project (PR process, branching).
*   **`compliance/`:** Notes and details related to regulatory compliance.
    *   [`compliance/README.md`](./compliance/README.md): Overview of compliance documentation.
    *   [`compliance/cfdi-4.0-notes.md`](./compliance/cfdi-4.0-notes.md): Specific implementation details, interpretations, and challenges related to CFDI 4.0.
    *   [`compliance/security-practices.md`](./compliance/security-practices.md): Overview of security measures implemented.
*   **`pac-integration/`:** Details about the integration with the chosen PAC provider.
    *   [`pac-integration/README.md`](./pac-integration/README.md): Information about the PAC API, endpoints used, error handling specifics, etc.

## Maintaining Documentation

Documentation should be kept up-to-date as the system evolves. Treat documentation as code – review changes and update relevant sections alongside feature development or architectural changes.