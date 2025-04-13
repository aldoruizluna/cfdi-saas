---
File Path: ./shared/README.md
---
# Shared Code Library (`shared/`)

## Purpose

This optional directory contains code, types, constants, or utility functions that need to be **shared across multiple backend microservices** or potentially **between the frontend and backend**.

Using a shared library helps to:
*   **Reduce Code Duplication (DRY):** Avoid writing the same logic or defining the same types in multiple places.
*   **Ensure Consistency:** Maintain consistency in data structures (DTOs, types) and common logic used across different parts of the application.

## Contents

*   **`types/`:** Shared TypeScript interfaces and type definitions. This is particularly useful for defining Data Transfer Objects (DTOs) used in API communication between services or between frontend and backend.
    *   Example: `InvoiceDTO`, `ExpenseDTO`, `UserRoleEnum`.
*   **`utils/`:** Common utility functions that don't belong to a specific service's domain but are needed in multiple places.
    *   Example: Date formatting functions, string manipulation utilities, custom validation helpers (if reusable across domains).
*   **`constants/`:** Shared constant values used across the application.
    *   Example: Default pagination sizes, specific event names for the message broker, common error codes/messages.

## Usage

### Backend Microservices

Backend services (in `backend/services/*`) can reference this shared library. Depending on the setup (monorepo tooling like Lerna/Nx or simple relative paths with TypeScript path mapping):

*   **Monorepo Tooling:** Configure the build system (e.g., `tsconfig.json`, `package.json` workspaces) so services can directly `import { InvoiceDTO } from '@shared/types';`.
*   **Relative Paths / TS Path Mapping:** Configure `tsconfig.json` in each service to map `@shared/*` to the correct relative path (e.g., `../../shared/*`).

### Frontend Application

Sharing code directly between backend (Node.js) and frontend (Browser) requires caution.

*   **Types:** Sharing TypeScript types (`shared/types/`) is generally safe and highly beneficial. Configure `tsconfig.json` in `frontend/` to resolve paths to the `shared/types` directory.
*   **Utils/Constants:** Only share utilities or constants from `shared/` if they are environment-agnostic (i.e., they don't rely on Node.js-specific APIs or browser-specific APIs unless appropriately checked). Ensure build tooling handles this correctly. Avoid sharing code with backend-specific dependencies (like database clients).

## Considerations

*   **Coupling:** Be mindful of introducing tight coupling between services via the shared library. Only share genuinely common code. Domain-specific logic should remain within the respective service.
*   **Versioning/Changes:** Changes in the shared library can potentially affect multiple services or the frontend. Ensure thorough testing after modifying shared code. In mature systems, versioning the shared library might become necessary.
*   **Build Complexity:** Sharing code, especially between backend and frontend, can add complexity to the build process. Ensure tooling is configured correctly.