---
File Path: ./docs/developer-guides/coding-standards.md
---
# Coding Standards

This document outlines the coding standards and conventions to be followed when developing for this platform. Adhering to these standards ensures code consistency, readability, and maintainability.

## General Principles

*   **Readability:** Write clear, understandable code. Use meaningful variable and function names. Add comments where necessary to explain complex logic or non-obvious decisions.
*   **Simplicity (KISS):** Keep It Simple, Stupid. Avoid unnecessary complexity. Prefer straightforward solutions.
*   **Don't Repeat Yourself (DRY):** Avoid duplicating code. Use functions, classes, components, and modules to promote reuse.
*   **Consistency:** Follow the established patterns and conventions used throughout the project. If introducing a new pattern, discuss it with the team first.

## Language Specific Standards

### TypeScript (Backend - NestJS & Frontend - React)

*   **Formatting:**
    *   Use **Prettier** for automatic code formatting. Configuration is defined in `.prettierrc` (or `package.json`).
    *   Ensure Prettier is integrated into your IDE to format on save.
    *   Run `npm run format` or equivalent script before committing.
*   **Linting:**
    *   Use **ESLint** for identifying problematic patterns or code that doesn't adhere to style guidelines. Configuration is defined in `.eslintrc.js` (or `.eslintrc.json`).
    *   Address all ESLint errors and warnings. Warnings should ideally be fixed or explicitly disabled with justification.
    *   Run `npm run lint` before committing.
*   **Naming Conventions:**
    *   `camelCase` for variables, functions, and object properties.
    *   `PascalCase` for classes, interfaces, types, enums, and React components.
    *   `UPPER_SNAKE_CASE` for constants and enum members.
    *   File names: `kebab-case.ts` or `PascalCase.tsx` for React components. Follow existing conventions within modules.
*   **Types:**
    *   Prefer `interface` for defining object shapes, use `type` for unions, intersections, primitives, etc.
    *   Use explicit types over `any`. If `any` is unavoidable, add a comment explaining why. Use `unknown` for safer alternatives to `any` when possible.
    *   Use TypeScript utility types (e.g., `Partial`, `Readonly`, `Pick`, `Omit`) where appropriate.
*   **Modules:**
    *   Use ES Modules (`import`/`export`).
    *   Organize imports: Group imports (e.g., Node built-ins, external libs, internal modules). Linters can often enforce this.
*   **Error Handling:**
    *   Use `try...catch` blocks for handling synchronous errors.
    *   Use `.catch()` or `async/await` with `try...catch` for handling promise rejections.
    *   Define custom error classes for specific error conditions where appropriate (e.g., `ValidationError`, `NotFoundError`).

### Backend Specific (NestJS)

*   Follow NestJS conventions for modules, controllers, services, providers, DTOs, etc.
*   Use decorators (`@Controller`, `@Injectable`, `@Get`, `@Post`, etc.) as intended.
*   Leverage built-in features like Pipes for validation/transformation and Guards for authorization.
*   Use dependency injection consistently.

### Frontend Specific (React)

*   **Components:**
    *   Prefer functional components with Hooks over class components.
    *   Keep components small and focused on a single responsibility.
    *   Use `PascalCase` for component file names (`MyComponent.tsx`) and component function names.
    *   Use TypeScript for prop types (`interface MyComponentProps`).
*   **Hooks:**
    *   Follow the Rules of Hooks.
    *   Create custom hooks (`useMyLogic`) to encapsulate reusable stateful logic.
*   **State Management:** Adhere to the patterns of the chosen state management library (e.g., Zustand, Redux Toolkit).
*   **Styling:** Follow the conventions of the chosen styling solution (e.g., Material UI component usage, Tailwind CSS utility classes, CSS Modules).

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This helps automate changelog generation and makes commit history easier to understand.

Example: `feat(invoice): add support for PDF generation`
Example: `fix(auth): correct redirect issue after MFA verification`
Example: `docs(readme): update setup instructions`
Example: `refactor(expense): simplify approval workflow logic`
Example: `test(invoice): add unit tests for validation service`

## Testing

*   Write meaningful tests for new features and bug fixes.
*   Aim for good test coverage (unit, integration, E2E where appropriate).
*   Test names should clearly describe what is being tested.
*   Follow the patterns and frameworks established in the project (e.g., Vitest/Jest, React Testing Library, Cypress).

## Code Reviews

*   All code should be reviewed via Pull Requests before merging.
*   Provide constructive feedback during reviews.
*   Ensure code adheres to these standards during review.