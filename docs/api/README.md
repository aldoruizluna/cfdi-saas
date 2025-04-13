---
File Path: ./docs/api/README.md
---
# API Documentation

This section provides documentation for the various Application Programming Interfaces (APIs) exposed by the platform.

## API Types

1.  **External RESTful API:**
    *   **Purpose:** Used by the frontend web application and potentially authorized third-party client applications.
    *   **Entry Point:** Through the API Gateway.
    *   **Specification:** Defined using the OpenAPI 3.0 standard.
    *   **Location:** [`openapi-spec.yaml`](./openapi-spec.yaml)
    *   **Authentication:** Typically uses JWT Bearer tokens obtained via the `/auth/login` flow.

2.  **Modular Connection Protocol (MCP) API:**
    *   **Purpose:** Designed specifically for integration with workflow automation platforms like n8n, Make, Zapier. Provides standardized endpoints for triggering actions and retrieving data.
    *   **Entry Point:** Through the `mcp-integration-service` (potentially routed via the API Gateway or a separate ingress).
    *   **Specification:** Described in a dedicated markdown document, detailing endpoints, request/response formats, authentication, and event schemas.
    *   **Location:** [`mcp-spec.md`](./mcp-spec.md)
    *   **Authentication:** Typically uses API Keys or OAuth 2.0 specific to the integration platform.

3.  **Internal Service-to-Service APIs:**
    *   **Purpose:** Used for communication *between* backend microservices.
    *   **Entry Point:** Direct service-to-service calls within the cluster or potentially routed through the gateway/service mesh.
    *   **Specification:** While not formally exposed externally, contracts should be clear. Can be documented internally using OpenAPI within each service's repository or through shared type definitions (`shared/` directory).
    *   **Authentication:** May use internal mechanisms like service accounts, mutual TLS, or short-lived tokens, depending on the cluster security setup.

## Using the APIs

*   Refer to the specific specification file (`openapi-spec.yaml` or `mcp-spec.md`) for endpoint details, parameters, request bodies, and response schemas.
*   Ensure you use the correct authentication method for the API you are targeting.
*   Consult the [User Guides](../user-guides/) or [Developer Guides](../developer-guides/) for examples and context on using the APIs.
*   Consider using tools like Swagger UI / Redoc (for OpenAPI) or Postman to explore and test the APIs.