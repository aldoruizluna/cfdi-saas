---
File Path: ./docs/pac-integration/README.md
---
# PAC Integration Documentation

This document provides details about the integration between the `invoice-service` and the chosen **Proveedor Autorizado de Certificación (PAC)** for CFDI `timbrado` (certification) and cancellation.

## Chosen PAC Provider

*   **Provider Name:** [Enter the Name of the Selected PAC Provider, e.g., Finkok, Solucion Factible, Diverza, SW Sapien]
*   **Website:** [Link to PAC Provider's Website]
*   **API Documentation:** [Direct Link to the PAC's Developer/API Documentation]

## Integration Points (`invoice-service`)

The `invoice-service` interacts with the PAC provider's API for the following core functions:

1.  **Timbrado (Certification):**
    *   **PAC API Endpoint:** `[Specific PAC Endpoint URL for Timbrar/Stamp/Issue]`
    *   **Method:** Typically `POST`
    *   **Protocol:** Typically `SOAP` or `REST (JSON/XML)`
    *   **Request Payload:** Contains the unsigned CFDI 4.0 XML (as base64 encoded string or raw XML, depending on PAC spec), along with PAC account credentials (username/password or API tokens).
    *   **Success Response:** Contains the certified CFDI XML (including the `TimbreFiscalDigital` complement) or relevant metadata like UUID, timestamps, and PAC seal.
    *   **Error Response:** Contains error codes and messages indicating validation failures (SAT rules, PAC rules) or processing issues.
2.  **Cancellation:**
    *   **PAC API Endpoint:** `[Specific PAC Endpoint URL for Cancelar/Cancel]`
    *   **Method:** Typically `POST`
    *   **Protocol:** Typically `SOAP` or `REST (JSON/XML)`
    *   **Request Payload:** Contains the UUID(s) of the invoice(s) to be cancelled, the emitter's RFC, PAC credentials, and potentially the cancellation reason (`Motivo`) and replacement UUID (`FolioSustitucion`).
    *   **Success Response:** Contains an acknowledgment (`Acuse`) of the cancellation request, including status codes indicating if the cancellation was processed immediately, is pending acceptance, or was rejected.
    *   **Error Response:** Contains error codes for invalid requests or processing failures.
3.  **(Optional) Status Check:**
    *   Some PACs provide an endpoint to check the status of a previously submitted cancellation request or the validity status of a CFDI.
    *   **PAC API Endpoint:** `[Specific PAC Endpoint URL for ConsultarStatus/GetStatus]`

## Authentication

*   Authentication with the PAC API uses [Specify method: e.g., Username/Password in SOAP Header/HTTP Basic Auth, API Key/Token in HTTP Header].
*   These credentials are stored securely (e.g., AWS Secrets Manager) and loaded as environment variables into the `invoice-service`.

## Error Handling Specifics

*   The `invoice-service` includes logic to parse common PAC error codes related to:
    *   SAT Validation Errors (e.g., `301: Estructura inválida`, `402: RFC del receptor inválido`, specific catalog errors).
    *   Authentication Failures.
    *   Connection Issues / Timeouts.
    *   PAC Internal Errors.
*   Error codes and messages from the PAC are logged for debugging.
*   User-friendly messages are generated based on common, actionable errors.
*   [Specify retry strategy, if any, for transient errors like timeouts].

## Environment Configuration

*   **Development/Staging:** The `invoice-service` connects to the PAC's **Sandbox/Test Environment**.
    *   Sandbox Endpoint URLs: `[List Sandbox URLs used]`
    *   Sandbox Credentials: Loaded via `.env` files for local/staging.
*   **Production:** The `invoice-service` connects to the PAC's **Production Environment**.
    *   Production Endpoint URLs: `[List Production URLs used]`
    *   Production Credentials: Loaded securely via environment variables injected from a secrets manager.

## Key Considerations

*   Ensure the PAC provider selected is currently authorized by SAT.
*   Thoroughly test all scenarios (success, various errors, cancellation reasons) in the PAC's sandbox environment before going live.
*   Monitor PAC service availability and response times.
*   Understand the PAC's support process for integration issues.