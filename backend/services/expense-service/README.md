---
File Path: ./backend/services/expense-service/README.md
---
# Expense Management Service (`expense-service`)

## Purpose

This microservice handles the creation, management, approval, and analysis of business expenses recorded within the platform.

## Key Responsibilities

*   **Expense Entry:** Providing APIs for users to record expense details (date, amount, category, description, payment method).
*   **Receipt Management:** Handling uploads of expense proof (receipt images/PDFs) and linking them to expense records. Secure storage of attachments (e.g., S3).
*   **Optical Character Recognition (OCR):** (Future Scope) Integrating with an OCR service to automatically extract data (vendor, date, amount, taxes) from uploaded receipts to pre-populate expense entries.
*   **Approval Workflow:**
    *   Implementing configurable multi-level approval workflows based on rules (e.g., amount, category, submitter's department).
    *   Tracking the status of expenses through the approval process (Submitted, Pending Approval, Approved, Rejected).
    *   Recording approver comments and maintaining an audit trail.
*   **Categorization:** Allowing users to categorize expenses, potentially with suggestions based on past data or OCR results.
*   **Reporting Data Provision:** Providing APIs to retrieve expense data for reporting and analytics purposes (e.g., expenses by category, period, user, status).

## Technology Stack (Example)

*   **Language/Framework:** Node.js / TypeScript / NestJS
*   **Database:** PostgreSQL (for expense metadata, workflow status). Potentially NoSQL (MongoDB) for audit trails or reporting aggregation.
*   **Storage:** Blob Storage (e.g., AWS S3) for receipt files.
*   **Workflow Engine:** (Optional) Could use a dedicated library/service (like Zeebe, Camunda Platform 8) or implement state machines within the service.
*   **OCR Integration:** Client library for a chosen OCR provider (e.g., Google Vision AI, AWS Textract, Azure Form Recognizer).

## API Endpoints (Internal/Gateway Exposed)

*   `POST /expenses`: Create a new expense entry.
*   `POST /expenses/{id}/attach`: Upload a receipt file for an expense.
*   `GET /expenses`: List expenses (paginated, filterable by status, date, user, category).
*   `GET /expenses/{id}`: Get details of a specific expense, including attachment info.
*   `GET /expenses/{id}/attachment`: Download the attached receipt file.
*   `PUT /expenses/{id}`: Update an existing expense entry (if allowed by status).
*   `DELETE /expenses/{id}`: Delete an expense entry (if allowed by status).
*   `POST /expenses/{id}/submit`: Submit an expense for approval.
*   `POST /expenses/{id}/approve`: Approve a pending expense.
*   `POST /expenses/{id}/reject`: Reject a pending expense (requires reason/comment).
*   `GET /expenses/report`: Endpoint to fetch aggregated data for reporting.

Refer to the main [OpenAPI Specification](../../../../docs/api/openapi-spec.yaml) for detailed definitions.

## Configuration

*   Database connection string(s).
*   Blob storage configuration (bucket, credentials).
*   OCR Service credentials and endpoint (if applicable).
*   Default approval workflow settings.

Loaded primarily via environment variables.

## Running Locally

1.  Ensure PostgreSQL and blob storage emulator (e.g., MinIO) are running.
2.  `npm install`
3.  Configure environment variables.
4.  `npm run start:dev`

## Testing

*   `npm run test` (Unit tests, mock dependencies)
*   `npm run test:int` (Integration tests with DB, MinIO)
*   `npm run test:e2e` (End-to-end tests hitting running service)