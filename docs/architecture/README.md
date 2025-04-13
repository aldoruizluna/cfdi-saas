---
File Path: ./docs/architecture/README.md
---
# System Architecture Documentation

This section provides an overview of the technical architecture for the SaaS Invoicing & Expense Management platform.

## Overview

The platform is designed using a **cloud-native microservices architecture** hosted on [Target Cloud Provider, e.g., AWS]. This approach promotes scalability, resilience, independent deployments, and technology diversity (if needed).

Key architectural tenets include:
*   **Domain-Driven Design:** Services are aligned with specific business capabilities (Invoicing, Expenses, Auth).
*   **Asynchronous Communication:** Using a message broker for non-critical inter-service communication to enhance decoupling and resilience.
*   **Synchronous Communication:** Using RESTful APIs via an API Gateway for frontend-backend and essential service-to-service interactions.
*   **Containerization:** All services are packaged as Docker containers.
*   **Orchestration:** Kubernetes is used for deploying, scaling, and managing containerized applications.
*   **Infrastructure as Code:** Infrastructure is managed using Terraform.
*   **Stateless Services:** Backend services should be designed to be stateless whenever possible, externalizing state to databases or caches.

## Diagrams

*   **`high-level-diagram.png`**: A visual overview showing the main components (Frontend, API Gateway, Microservices, Databases, Cloud Provider) and their interactions. *(This file needs to be created)*
*   **(Optional) Sequence Diagrams:** Add diagrams illustrating key workflows (e.g., Invoice Creation Flow, Expense Approval Flow).
*   **(Optional) Network Diagram:** Showing VPCs, subnets, security groups (especially if complex).

## Key Components

*   **Frontend SPA:** React-based single-page application.
*   **API Gateway:** Entry point for external traffic (Kong/Nginx/Cloud Gateway).
*   **Microservices:** Auth, Invoice, Expense, Notification, MCP Integration (Node.js/NestJS).
*   **Databases:** PostgreSQL (Primary Relational), MongoDB (Logging/Analytics).
*   **Message Broker:** RabbitMQ.
*   **Blob Storage:** AWS S3.
*   **Orchestrator:** Kubernetes (AWS EKS).

## Architecture Decision Records (ADRs)

Significant architectural decisions are documented using ADRs to capture the context, decision, and consequences.

*   **`adrs/`**: Directory containing ADR markdown files.
    *   [`adrs/001-microservices-choice.md`](./adrs/001-microservices-choice.md): Justification for using a microservices architecture.
    *   *(Add more ADRs as decisions are made, e.g., Database Choice, Message Broker Choice, API Gateway Choice, PAC Provider Choice)*

## Further Details

Refer to the README files within each service (`backend/services/*`) and component (`backend/api-gateway/`, `frontend/`) for more specific implementation details.