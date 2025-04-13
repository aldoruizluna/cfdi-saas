---
File Path: ./backend/README.md
---
# Backend Services

This directory contains all the microservices and the API Gateway configuration that constitute the backend of the SaaS platform.

## Architecture Overview

The backend follows a microservices architecture designed for scalability, resilience, and independent deployment. Each service focuses on a specific business capability.

*   Services run as containerized applications (Docker).
*   Orchestration is planned using Kubernetes (see `infrastructure/`).
*   Communication happens via:
    *   Synchronous RESTful APIs (primarily through the API Gateway).
    *   Asynchronous events/messages via a message broker (e.g., RabbitMQ) for decoupling workflows (like notifications).
*   The API Gateway acts as the single entry point for frontend and external API consumers.

Refer to the main [Backend Architecture Documentation](../docs/architecture/README.md) for detailed diagrams, communication patterns, and technology choices.

## Services & Components

*   **`services/auth-service/`:** Handles user identity, authentication (login, MFA), authorization (roles, permissions), and user profile management.
*   **`services/invoice-service/`:** Core logic for CFDI 4.0 invoicing, including generation, validation, PAC integration (`timbrado`), cancellation, and document access.
*   **`services/expense-service/`:** Manages expense records, receipt uploads, OCR processing (future), approval workflows, and related data.
*   **`services/notification-service/`:** Responsible for sending notifications (email, in-app alerts) triggered by events in other services.
*   **`services/mcp-integration-service/`:** Exposes the Modular Connection Protocol (MCP) endpoints for integration with automation platforms like n8n. Acts as an adapter layer to other internal services.
*   **`api-gateway/`:** Configuration and potentially custom logic for the API Gateway (e.g., Kong, Nginx Ingress, custom service) handling request routing, rate limiting, authentication enforcement, and request/response transformations.

Navigate to each service's directory for its specific README, source code, and configuration.

## Development Practices

*   Each service should be runnable independently for development and testing where feasible.
*   Use the root `docker-compose.yml` for integrated local testing of multiple services.
*   Follow the [Coding Standards](../docs/developer-guides/coding-standards.md).
*   Ensure comprehensive test coverage (unit, integration, contract).

## API Documentation

*   Internal service-to-service API contracts should be clearly defined (e.g., using OpenAPI specs within services or gRPC definitions).
*   External REST APIs exposed via the gateway are documented in the central [OpenAPI Specification](../docs/api/openapi-spec.yaml).
*   MCP endpoints are documented separately in the [MCP Specification](../docs/api/mcp-spec.md).