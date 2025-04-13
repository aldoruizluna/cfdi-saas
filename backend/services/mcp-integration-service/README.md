---
File Path: ./backend/services/mcp-integration-service/README.md
---
# MCP Integration Service (`mcp-integration-service`)

## Purpose

This microservice acts as a dedicated adapter layer exposing **Modular Connection Protocol (MCP)** endpoints. Its primary goal is to facilitate seamless integration with external workflow automation platforms like n8n, Make (Integromat), Zapier, etc.

It translates incoming MCP requests into actions or data requests for the internal core microservices (Invoice, Expense, etc.) and formats responses according to the MCP specification.

## Key Responsibilities

*   **Expose MCP Endpoints:** Define and serve HTTP endpoints following the standardized structure and authentication methods defined by the MCP specification being implemented (details TBD based on specific MCP version/standard).
*   **Authentication & Authorization:** Implement security mechanisms suitable for MCP (e.g., API Keys, OAuth 2.0) to authenticate and authorize requests from external automation platforms.
*   **Request Translation:** Parse incoming MCP requests (e.g., create invoice, get expense status, list approved expenses).
*   **Internal Service Orchestration:** Make appropriate calls to the internal `invoice-service`, `expense-service`, etc., to fulfill the MCP request.
*   **Response Formatting:** Format the data received from internal services into the standardized MCP response structure.
*   **Webhook Registration/Management (If applicable to MCP spec):** Potentially manage subscriptions for external platforms wishing to receive real-time event notifications via webhooks (though webhooks might also be managed by a separate system or the API Gateway).
*   **Error Handling:** Translate internal errors into appropriate MCP error responses.

## Technology Stack (Example)

*   **Language/Framework:** Node.js / TypeScript / NestJS (chosen for consistency, but Go could also be suitable for a lean API layer).
*   **HTTP Client:** For making requests to internal microservices.
*   **Security Libraries:** For handling API Key validation, OAuth 2.0 flows, etc.

## API Endpoints (MCP)

The specific endpoints depend heavily on the chosen/defined MCP specification. Examples might include:

*   `POST /mcp/v1/invoices`: Create a new invoice via MCP.
*   `GET /mcp/v1/invoices/{id}`: Retrieve invoice status/details via MCP.
*   `POST /mcp/v1/expenses`: Create a new expense record via MCP.
*   `GET /mcp/v1/expenses`: List expenses based on criteria via MCP.
*   `GET /mcp/v1/events/schema`: (Common in MCP) Endpoint to describe available triggers/actions.
*   `POST /mcp/v1/webhooks`: (If applicable) Register a webhook URL for specific events.
*   `DELETE /mcp/v1/webhooks/{hookId}`: (If applicable) Unregister a webhook.

Refer to the dedicated [MCP Specification Document](../../../../docs/api/mcp-spec.md) for the canonical definition of endpoints, request/response schemas, and authentication methods.

## Configuration

*   Internal service discovery mechanism or hardcoded URLs (for local dev) for Invoice Service, Expense Service, etc.
*   Security configuration (API key storage/validation method, OAuth provider details if used).
*   MCP specific settings.

Loaded primarily via environment variables.

## Running Locally

1.  Ensure internal services (Invoice, Expense, Auth) it depends on are running.
2.  `npm install`
3.  Configure environment variables.
4.  `npm run start:dev`

## Testing

*   `npm run test` (Unit tests, mock internal service clients)
*   `npm run test:int` (Integration tests, requires internal services running)
*   Testing should validate compliance with the MCP specification, including authentication, request parsing, response formatting, and error handling. Use tools like Postman or `curl` to simulate MCP client requests.