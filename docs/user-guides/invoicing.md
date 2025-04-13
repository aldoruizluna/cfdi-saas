---
File Path: ./docs/user-guides/invoicing.md
---
# User Guide: Managing Invoices (CFDI 4.0)

This guide explains how to use the invoicing module of the platform.

## Creating a New Invoice (CFDI Ingreso)

1.  Navigate to the "Invoicing" or "Emitir CFDI" section.
2.  Click the "Create New Invoice" or similar button.
3.  **Invoice Wizard:** Follow the steps in the guided wizard:
    *   **Client Information:** Select an existing client or enter new client details (RFC, Name, Address, Tax Regime). Ensure the client's RFC and Tax Regime (`RegimenFiscalReceptor`) are correct.
    *   **Invoice Details:**
        *   **Uso CFDI:** Select the appropriate Use of CFDI code provided by your client (e.g., `G01`, `G03`, `I01`). This is crucial for CFDI 4.0.
        *   **Payment Method (`MetodoPago`):** Select `PUE` (Pago en Una Exhibición - Single Payment) or `PPD` (Pago en Parcialidades o Diferido - Partial or Deferred Payment).
        *   **Payment Form (`FormaPago`):** Select how the payment *will be* made (e.g., `03` Transferencia, `01` Efectivo, `04` Tarjeta de crédito). Required if `MetodoPago` is `PUE`.
        *   **Currency (`Moneda`):** Typically `MXN`.
        *   **Exportation (`Exportacion`):** Select the relevant code (`01` No Aplica, `02` Definitiva, `03` Temporal). Usually `01` for domestic transactions.
    *   **Concepts (`Conceptos`):** Add line items for the goods or services being invoiced.
        *   **Product/Service Key (`ClaveProdServ`):** Use the SAT catalog key corresponding to the item.
        *   **Quantity (`Cantidad`):** Number of items.
        *   **Unit Key (`ClaveUnidad`):** Use the SAT catalog key for the unit (e.g., `E48` for Service Unit, `H87` for Piece).
        *   **Description (`Descripcion`):** Detailed description of the item.
        *   **Unit Price (`ValorUnitario`):** Price per unit before taxes.
        *   **Discount (`Descuento`):** Optional discount for the line item.
        *   **Taxes (`Impuestos`):** Specify applicable taxes (usually IVA 16% Trasladado). Ensure `ObjetoImp` is set correctly (usually `02` - Yes, object of tax).
    *   **Review:** Carefully review all entered information for accuracy. Check totals and tax calculations.
4.  **Submit:** Click "Emitir" or "Timbrar". The system will send the data to the PAC for certification.

## Finding and Viewing Invoices

*   Go to the "Invoices" or "Consultar CFDI" section.
*   Use the search and filter options (by Client RFC, Date Range, Folio Fiscal UUID, Status) to find invoices.
*   Click on an invoice in the list to view its details.

## Downloading Invoice Files

*   From the invoice details view, click the "Download XML" or "Download PDF" buttons to get the respective files. The XML is the official fiscal document.

## Cancelling an Invoice

*Note: Cancellation rules depend on SAT regulations and the invoice status/amount/time elapsed.*

1.  Find the invoice you need to cancel in the invoice list.
2.  Ensure the invoice is eligible for cancellation.
3.  Click the "Cancel" or "Solicitar Cancelación" button/option for that invoice.
4.  Select the **Reason for Cancellation (`Motivo`)** from the SAT catalog (e.g., `01` Comprobante emitido con errores con relación, `02` Comprobante emitido con errores sin relación).
5.  If the reason is `01`, you may need to provide the **Folio Fiscal UUID** of the invoice that replaces the cancelled one (`FolioSustitucion`).
6.  Confirm the cancellation request.
7.  The system will send the request to the PAC. The cancellation status (e.g., "Pending Acceptance", "Cancelled", "Rejected") will be updated in the invoice list. Some cancellations may require acceptance by the recipient via the SAT portal.

## Understanding Invoice Statuses

*   **Draft:** Saved but not yet submitted for certification.
*   **Processing/Timbrando:** Sent to the PAC, awaiting response.
*   **Vigente (Valid):** Successfully certified by the PAC.
*   **Error:** Failed certification due to validation errors or PAC issues. Check error details.
*   **Cancellation Requested:** Cancellation submitted, may be pending recipient acceptance.
*   **Cancelled:** Successfully cancelled according to SAT rules.
*   **Cancellation Rejected:** Cancellation request was rejected (by SAT or recipient).