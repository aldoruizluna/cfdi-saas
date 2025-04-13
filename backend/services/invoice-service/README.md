---
File Path: ./backend/services/invoice-service/README.md
---
# Invoice Service (`invoice-service`)

## Purpose

This microservice is the core engine for handling Mexican electronic invoices (CFDI) in compliance with SAT regulations, specifically CFDI Version 4.0.

## Key Responsibilities

*   **CFDI Generation:** Constructing the XML structure for invoices based on user input and business rules. Primarily focused on `Ingreso` type for MVP, extensible to `Pago`, `Traslado`, `Nómina`, and `Notas de Crédito/Débito`.
*   **Data Validation:** Rigorously validating invoice data against SAT schemas (XSDs) and catalog requirements (`c_UsoCFDI`, `c_RegimenFiscal`, `c_MetodoPago`, `c_FormaPago`, `c_ObjetoImp`, etc.) before attempting `timbrado`.
*   **PAC Integration:**
    *   Securely communicating with the chosen Proveedor Autorizado de Certificación (PAC) via their API.
    *   Sending invoice data for `timbrado` (digital sealing and certification).
    *   Receiving and processing the certified XML (`Comprobante` with `TimbreFiscalDigital`).
    *   Handling API errors and retries according to PAC specifications.
*   **Document Management:**
    *   Storing the certified XML file securely (e.g., in blob storage like S3).
    *   Generating a standard PDF representation of the CFDI, including the QR code and required elements.
    *   Storing metadata and references to documents in the primary database (PostgreSQL).
*   **Cancellation:** Implementing the SAT's cancellation workflow (with or without acceptance) by interacting with the PAC's cancellation endpoint. Tracking cancellation status.
*   **Retrieval & Querying:** Providing APIs to search, filter, and retrieve invoice metadata, XML, and PDF documents based on various criteria (UUID, RFC, date range, status).

## Technology Stack (Example)

*   **Language/Framework:** Node.js / TypeScript / NestJS
*   **Database Interaction:** TypeORM / Prisma (with PostgreSQL)
*   **XML Handling:** Libraries like `xmlbuilder2` (creation), `libxmljs` or similar (validation against XSD).
*   **PDF Generation:** Libraries like `pdfkit` or `puppeteer` (using HTML templates).
*   **PAC Client:** Custom HTTP client tailored to the specific PAC's API (SOAP/REST).

## API Endpoints (Internal/Gateway Exposed)

*   `POST /invoices`: Create a new invoice draft and attempt `timbrado`.
*   `GET /invoices`: List invoices (paginated, filterable by client RFC, date, status, UUID).
*   `GET /invoices/{id}`: Get detailed metadata for a specific invoice.
*   `GET /invoices/{id}/xml`: Download the certified XML file.
*   `GET /invoices/{id}/pdf`: Download the generated PDF representation.
*   `POST /invoices/{id}/cancel`: Initiate the cancellation process for an invoice.
*   `GET /invoices/catalogs/{catalogName}`: (Optional) Endpoint to retrieve SAT catalog data used by the frontend.

Refer to the main [OpenAPI Specification](../../../../docs/api/openapi-spec.yaml) for detailed definitions.

## Configuration

*   Database connection string.
*   **PAC Credentials:** API Keys/Tokens, User IDs, Endpoint URLs (critical, load securely via environment variables/secrets management).
*   CSD Certificate paths/credentials (`.cer`, `.key`, password) for testing/signing before PAC (if needed locally).
*   Blob storage configuration (e.g., S3 bucket, credentials).
*   SAT XSD file locations (for local validation).

## Running Locally

1.  Ensure PostgreSQL and potentially blob storage emulator (e.g., MinIO) are running.
2.  `npm install`
3.  Configure PAC sandbox credentials in environment variables.
4.  `npm run start:dev`

## Testing

*   **Crucial:** Test thoroughly against SAT XSDs and PAC sandbox environments.
*   `npm run test` (Unit tests, mock PAC interactions)
*   `npm run test:int` (Integration tests with DB, potentially MinIO)
*   `npm run test:e2e` (End-to-end tests hitting running service, requires PAC sandbox configured)