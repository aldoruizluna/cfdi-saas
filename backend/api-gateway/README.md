---
File Path: ./backend/api-gateway/README.md
---
# API Gateway

## Purpose

This component acts as the single entry point for all incoming traffic from the frontend application and potentially third-party API consumers (excluding MCP traffic, which might have its own path or go through this gateway as well - TBD).

It handles cross-cutting concerns before routing requests to the appropriate backend microservices.

## Key Responsibilities

*   **Request Routing:** Directing incoming HTTP requests to the correct internal microservice based on the path, method, or other headers.
*   **Authentication & Authorization:** Verifying credentials (e.g., validating JWT tokens issued by the `auth-service`) for protected routes. Can offload initial token validation.
*   **Rate Limiting:** Protecting backend services from abuse or overload by limiting the number of requests per client.
*   **Request/Response Transformation:** Modifying requests or responses if needed (e.g., adding headers, simplifying responses).
*   **SSL Termination:** Handling HTTPS connections and decrypting traffic before forwarding it to internal services (which might communicate over HTTP internally within a secure network).
*   **Load Balancing:** (Often handled by underlying infrastructure like K8s Ingress or Cloud Load Balancer, but the gateway might participate).
*   **Logging & Monitoring:** Centralized logging of requests and responses, integration with monitoring tools.
*   **CORS Handling:** Managing Cross-Origin Resource Sharing policies.

## Technology Choice (Example - Choose One or Combine)

*   **Managed Cloud Service:** AWS API Gateway, Azure API Management, Google Cloud API Gateway. Often integrates well with other cloud services but can have vendor lock-in.
*   **Off-the-Shelf Software:** Kong, Tyk, Nginx (with Ingress Controller in K8s). Offer robust features and flexibility, require self-hosting and management.
*   **Custom Service:** Building a lightweight gateway service (e.g., using Node.js/Express, Go/Gin). Provides maximum control but requires more development effort.

This directory contains the configuration files (if using software like Kong/Nginx) or potentially the source code (if building a custom service).

## Configuration (Example for Kong/Nginx)

*   **Route Definitions:** Mapping public paths to internal service URLs.
*   **Plugin Configuration:** Enabling and configuring plugins for auth, rate limiting, logging, CORS, etc.
*   **Upstream Service Definitions:** Details about the backend microservices.

Configuration might be declarative (YAML files) or managed via an Admin API.

## Deployment

The API Gateway is a critical piece of infrastructure and needs to be highly available. It's typically deployed as part of the Kubernetes cluster (e.g., as an Ingress controller) or using a managed cloud service.

## Documentation

*   The externally exposed REST API surface is defined in the [OpenAPI Specification](../docs/api/openapi-spec.yaml).
*   Configuration details specific to the chosen gateway technology should be documented here or in the `infrastructure/` directory.