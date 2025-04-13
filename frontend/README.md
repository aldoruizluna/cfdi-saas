---
File Path: ./frontend/README.md
---
# Frontend Web Application (SPA)

## Overview

This directory contains the source code for the Single-Page Application (SPA) web frontend for the SaaS Invoicing & Expense Management platform. Users interact with the platform's features through this interface.

## Key Features Implemented

*   User Login, Registration, MFA Setup.
*   Dashboard Overview.
*   Invoice Creation Wizard (CFDI 4.0).
*   Invoice Listing, Viewing, Downloading (XML/PDF), Cancellation Request.
*   Expense Entry Form (manual + attachment upload).
*   Expense Listing, Viewing.
*   (Admin) User Management Interface.
*   (Admin) Expense Approval/Rejection Interface.
*   User Profile Management.

## Technology Stack (Example)

*   **Framework:** React (using Vite for build tooling)
*   **Language:** TypeScript
*   **State Management:** Zustand / Redux Toolkit (Choose one)
*   **Routing:** React Router
*   **UI Components:** Material UI / Tailwind CSS + Headless UI (Choose one or combine)
*   **Data Fetching:** Axios / React Query / RTK Query
*   **Forms:** React Hook Form
*   **Testing:** Vitest / Jest, React Testing Library, Cypress (for E2E)

## Folder Structure (`src/`)

*   `assets/`: Static assets like images, fonts.
*   `components/`: Reusable UI components (presentational and container).
*   `config/`: Application configuration (API endpoints, feature flags).
*   `hooks/`: Custom React hooks for shared logic.
*   `layouts/`: Main application layout structures (e.g., with sidebar, header).
*   `pages/` or `views/`: Top-level components representing distinct application pages/screens.
*   `services/` or `api/`: Logic for interacting with the backend API Gateway.
*   `store/` or `state/`: State management setup (stores, slices, reducers).
*   `styles/`: Global styles, theme configuration, CSS modules.
*   `types/`: Shared TypeScript type definitions for the frontend.
*   `utils/`: General utility functions.
*   `App.tsx`: Root application component.
*   `main.tsx`: Application entry point.
*   `router.tsx`: Application routing configuration.

## Getting Started (Local Development)

1.  **Prerequisites:** Node.js (matching version specified in `.nvmrc` or `package.json`).
2.  **Navigate:** `cd frontend`
3.  **Install Dependencies:** `npm install` (or `yarn install`)
4.  **Configure Environment:** Create a `.env.local` file based on `.env.example` and set the `VITE_API_BASE_URL` to point to your local API Gateway (e.g., `http://localhost:8080/api`).
5.  **Run Development Server:** `npm run dev` (or `yarn dev`)
6.  Open your browser to the URL provided (usually `http://localhost:5173` for Vite).

## Building for Production

*   `npm run build`: Creates an optimized static build in the `dist/` directory.

## Testing

*   `npm run test`: Run unit and integration tests (Vitest/Jest).
*   `npm run test:e2e`: Run end-to-end tests (Cypress - requires backend running).
*   `npm run lint`: Run static code analysis (ESLint).
*   `npm run typecheck`: Run TypeScript compiler checks.

## Deployment

The production build (from `dist/`) consists of static assets (HTML, CSS, JS) that can be deployed to any static web hosting provider (e.g., AWS S3 + CloudFront, Vercel, Netlify, Azure Static Web Apps) or served via a simple web server (like Nginx).