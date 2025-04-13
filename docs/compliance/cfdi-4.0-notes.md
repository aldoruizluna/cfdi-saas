---
File Path: ./docs/compliance/cfdi-4.0-notes.md
---
# CFDI 4.0 Implementation Notes

This document details specific points, challenges, interpretations, and implementation choices related to adhering to the CFDI 4.0 standard as defined by SAT.

## Key Changes from CFDI 3.3 Addressed

*   **Mandatory Recipient Name & Tax Regime (`Nombre`, `RegimenFiscalReceptor`):** Requires accurate data from the invoice recipient, matching their Constancia de Situación Fiscal (CSF). Validation logic must enforce the presence and validity (based on RFC type) of the `RegimenFiscalReceptor`.
*   **Mandatory Recipient Address (`DomicilioFiscalReceptor`):** The recipient's **postal code** (`CodigoPostal`) is now mandatory and must match their CSF. Validation enforces this.
*   **Mandatory Emitter Tax Regime (`RegimenFiscal`):** The emitter's tax regime under which the invoice is issued is mandatory in the `Emisor` node.
*   **Exportation Attribute (`Exportacion`):** Mandatory attribute in the `Comprobante` node indicating if the operation involves exportation (`01`, `02`, `03`). Default is `01` (No Aplica) for domestic.
*   **Object of Tax Attribute (`ObjetoImp`)**: Mandatory attribute within each `Concepto` node, indicating if the concept is subject to indirect taxes (`01` No objeto de impuesto, `02` Sí objeto de impuesto, `03` Sí objeto del impuesto y no obligado al desglose). This affects how taxes are detailed.
*   **Account at Third Parties (`ACuentaTerceros`):** New node within `Concepto` for invoicing operations carried out on behalf of third parties. (Considered out of scope for MVP).
*   **Global Invoice (`InformacionGlobal`):** Changes related to invoices covering operations with the general public. (Requires specific handling if implemented).
*   **Cancellation Process:** New cancellation reasons (`Motivo`) and requirement to specify the replacing UUID (`FolioSustitucion`) for reason `01`. Implementation must support these codes via the PAC.
*   **Related CFDIs (`CfdiRelacionados`):** Updates to relationship types (`TipoRelacion`).

## Implementation Details & Choices

*   **Validation:**
    *   Primary validation against SAT XSD schemas is performed *before* sending data to the PAC. This reduces failed `timbrado` attempts.
    *   Catalog validation (e.g., ensuring `UsoCFDI` corresponds to `RegimenFiscalReceptor` and RFC type) is implemented within the `invoice-service`.
    *   Real-time validation feedback is provided to the user in the frontend invoice wizard.
*   **Recipient Data:**
    *   The system emphasizes the need for users to obtain accurate `Nombre`, `RFC`, `CodigoPostal`, and `RegimenFiscalReceptor` from their clients.
    *   Considered adding a feature to store/manage client fiscal data to pre-populate fields, but requires careful handling of potentially outdated information.
*   **Catalog Management:**
    *   SAT catalogs are [how are they stored? e.g., loaded into the database, kept as static files].
    *   A process needs to be defined for updating these catalogs when SAT publishes changes. [Is this manual or automated?].
*   **PDF Representation:**
    *   The generated PDF includes all mandatory elements specified by the CFF (Código Fiscal de la Federación) and RMF (Resolución Miscelánea Fiscal), including the QR code, digital seals, UUID, etc.
    *   Using [Chosen PDF library, e.g., pdfkit, puppeteer with HTML template] for generation.
*   **Error Handling:**
    *   PAC error codes and messages are logged and, where possible, translated into user-friendly messages displayed on the frontend. Common errors (e.g., invalid RFC, mismatched data with CSF) are highlighted specifically.

## Challenges & Considerations

*   **Obtaining Accurate Recipient Data:** This remains a primary challenge for users. The system relies on the user providing correct data matching the client's Constancia de Situación Fiscal (CSF). Potential future enhancement: SAT validation service integration (if available/feasible).
*   **Dynamic Catalog Updates:** Keeping SAT catalogs up-to-date requires a reliable process.
*   **Cancellation Complexity:** The cancellation process involving recipient acceptance adds complexity. The system needs to track the status reported by the PAC/SAT.
*   **Handling Edge Cases:** Complex scenarios like invoicing for third parties (`ACuentaTerceros`) or specific complementos (`Complementos`) require dedicated implementation beyond the basic CFDI structure.

*(Add more notes here as specific issues or decisions arise during development and testing)*