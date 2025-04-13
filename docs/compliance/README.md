---
File Path: ./docs/compliance/README.md
---
# Compliance Documentation

This section provides information related to the platform's adherence to relevant regulations and standards, particularly focused on the Mexican market.

## Key Compliance Areas

*   **Fiscal Compliance (Mexico - SAT):**
    *   **CFDI 4.0:** The platform's invoicing module is designed to generate, validate, certify (`timbrar`), and cancel electronic invoices (CFDIs) strictly according to the Anexo 20 guidelines and technical specifications for CFDI version 4.0 published by the Servicio de Administración Tributaria (SAT). See [`cfdi-4.0-notes.md`](./cfdi-4.0-notes.md) for implementation specifics.
    *   **Catalogs (Catálogos SAT):** Utilization of official SAT catalogs for fields like `c_UsoCFDI`, `c_RegimenFiscal`, `c_MetodoPago`, `c_FormaPago`, `c_ObjetoImp`, `c_ClaveProdServ`, `c_ClaveUnidad`, etc. Mechanisms should be in place to update these catalogs as needed.
    *   **PAC Integration:** Integration with authorized PACs (Proveedores Autorizados de Certificación) follows SAT requirements for sending, receiving, and cancelling CFDIs.
    *   **Data Retention:** Adherence to legal requirements for storing CFDI XML files and related fiscal information for the minimum mandated period (typically 5 years).
*   **Data Privacy:**
    *   Compliance with relevant data protection laws (e.g., Ley Federal de Protección de Datos Personales en Posesión de los Particulares - LFPDPPP in Mexico, if applicable).
    *   Secure handling and storage of Personally Identifiable Information (PII).
    *   Clear privacy policy for users.
*   **Security:**
    *   Implementation of security best practices for cloud applications. See [`security-practices.md`](./security-practices.md) for an overview.

## Documents

*   [`cfdi-4.0-notes.md`](./cfdi-4.0-notes.md): Specific details, challenges, and interpretations encountered during the implementation of CFDI 4.0 requirements.
*   [`security-practices.md`](./security-practices.md): Overview of security measures related to authentication, authorization, data encryption, infrastructure security, etc.
*   **(To be created) Data Retention Policy:** Document outlining how long different types of data (especially fiscal documents) are stored and the process for deletion/anonymization.
*   **(To be created) Privacy Policy:** Link to or content of the user-facing privacy policy.

## Disclaimer

This documentation provides an overview of compliance considerations. It is not exhaustive legal advice. Consult with legal and fiscal experts to ensure full compliance with all applicable laws and regulations in Mexico.