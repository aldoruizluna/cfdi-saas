---
File Path: ./backend/services/auth-service/README.md
---
# Authentication Service (`auth-service`)

## Purpose

This microservice manages user identity, authentication, and authorization for the entire platform. It acts as the central authority for verifying users and determining their access rights.

## Key Responsibilities

*   **User Registration:** Handling new user sign-ups.
*   **Authentication:**
    *   Verifying user credentials (e.g., email/password).
    *   Issuing access tokens (e.g., JWT) upon successful login.
    *   Implementing and managing Multi-Factor Authentication (MFA) setup and verification.
*   **Authorization:**
    *   Managing user roles and permissions (Role-Based Access Control - RBAC).
    *   Providing mechanisms for other services to verify user permissions for specific actions.
*   **User Profile Management:** Allowing users to view and update basic profile information.
*   **Password Management:** Handling password reset flows.
*   **Token Management:** Handling token refresh and revocation (optional).

## Technology Stack (Example)

*   **Language/Framework:** Node.js / TypeScript / NestJS
*   **Database:** PostgreSQL (for user accounts, roles, credentials)
*   **Libraries:** Passport.js (or similar for auth strategies), bcrypt (password hashing), JWT library (jsonwebtoken), TOTP library (speakeasy).

## API Endpoints (Internal/Gateway Exposed)

*   `POST /auth/register`: Register a new user.
*   `POST /auth/login`: Authenticate user and return tokens.
*   `POST /auth/refresh`: Refresh access token using a refresh token.
*   `POST /auth/logout`: Log out user (e.g., invalidate refresh token).
*   `POST /auth/mfa/setup`: Initiate MFA setup (e.g., generate QR code).
*   `POST /auth/mfa/verify`: Verify MFA code during login or setup.
*   `POST /auth/mfa/disable`: Disable MFA for the user.
*   `GET /auth/me`: Get the profile of the currently authenticated user.
*   `PUT /auth/me/profile`: Update user profile details.
*   `POST /auth/password/forgot`: Initiate password reset flow.
*   `POST /auth/password/reset`: Complete password reset.
*   `GET /auth/validate`: (Internal) Endpoint for other services to validate a token and get user info/permissions.

Refer to the main [OpenAPI Specification](../../../../docs/api/openapi-spec.yaml) for detailed definitions of gateway-exposed endpoints.

## Configuration

*   Database connection string.
*   JWT secret key and expiration times.
*   MFA configuration.
*   Email service details (for password reset, MFA setup).
*   Password hashing parameters (e.g., salt rounds).

Loaded primarily via environment variables.

## Running Locally

1.  Ensure PostgreSQL is running.
2.  `npm install`
3.  `npm run start:dev`

## Testing

*   `npm run test` (Unit tests)
*   `npm run test:int` (Integration tests - may require DB)
*   `npm run test:e2e` (End-to-end tests - requires service running)