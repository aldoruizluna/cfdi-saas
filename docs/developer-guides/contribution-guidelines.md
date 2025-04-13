---
File Path: ./docs/developer-guides/contribution-guidelines.md
---
# Contribution Guidelines

Thank you for considering contributing to the platform! Following these guidelines helps maintain code quality, consistency, and ensures a smooth collaboration process.

## Getting Started

1.  **Ensure Setup:** Make sure you have followed the [Local Development Setup Guide](./local-setup.md) correctly.
2.  **Find an Issue:** Look for open issues in the project's issue tracker (e.g., GitHub Issues). If you want to work on something not listed, consider creating a new issue first to discuss it.
3.  **Claim an Issue:** Assign the issue to yourself or comment that you intend to work on it.

## Branching Strategy

We use a simplified Gitflow-like strategy:

*   **`main`:** Represents the latest production-ready code. Direct commits are **not allowed**. Merges happen only from `develop` during a release.
*   **`develop`:** The main integration branch for ongoing development. All feature branches are merged into `develop`. This branch should ideally always be in a state that could be deployed to staging.
*   **Feature Branches:** Create branches off `develop` for new features or bug fixes.
    *   Naming convention: `feat/[issue-id]-[short-description]` (e.g., `feat/PROJ-123-add-mcp-invoice-endpoint`) or `fix/[issue-id]-[short-description]` (e.g., `fix/PROJ-456-expense-date-validation`).
*   **Release Branches:** (Optional) Created from `develop` when preparing for a production release (`release/v1.2.0`). Only bug fixes related to the release are merged here. Once stable, merged into `main` and `develop`.
*   **Hotfix Branches:** Created from `main` to fix critical production bugs (`hotfix/[issue-id]-[short-description]`). Merged back into both `main` and `develop`.

## Development Workflow

1.  **Sync `develop`:** `git checkout develop && git pull origin develop`
2.  **Create Feature Branch:** `git checkout -b feat/PROJ-123-my-feature develop`
3.  **Implement Changes:** Write your code and tests. Adhere to the [Coding Standards](./coding-standards.md).
4.  **Commit Changes:** Use [Conventional Commits](https://www.conventionalcommits.org/) format. Commit frequently with meaningful messages.
    ```bash
    git add .
    git commit -m "feat(module): describe your change concisely"
    # Add more details in the commit body if needed
    ```
5.  **Keep Branch Updated:** Regularly rebase your feature branch onto the latest `develop` to avoid large merge conflicts later:
    ```bash
    git checkout develop
    git pull origin develop
    git checkout feat/PROJ-123-my-feature
    git rebase develop
    # Resolve any conflicts that arise during rebase
    ```
6.  **Push Feature Branch:** `git push origin feat/PROJ-123-my-feature`

## Pull Request (PR) Process

1.  **Create PR:** Once your feature/fix is complete and tested, create a Pull Request on GitHub from your feature branch targeting the `develop` branch.
2.  **PR Description:**
    *   Use the PR template provided (if any).
    *   Clearly describe the **purpose** of the PR and the changes made.
    *   Link the related issue(s) (e.g., "Closes #123", "Fixes #456").
    *   Include screenshots or GIFs for UI changes.
    *   Explain any non-obvious decisions or trade-offs.
3.  **CI Checks:** Ensure all automated checks (linting, tests, builds) pass on the PR. Fix any failures.
4.  **Code Review:**
    *   Assign at least one or two reviewers (check project guidelines for specifics).
    *   Reviewers will check for correctness, adherence to standards, potential issues, and test coverage.
    *   Respond to feedback constructively. Make necessary changes by pushing additional commits to your feature branch (the PR will update automatically).
5.  **Approval & Merge:** Once the PR is approved and all checks pass, a maintainer will merge it into the `develop` branch (typically using a squash merge or rebase merge, depending on project policy).
6.  **Clean Up:** Delete your feature branch after the PR is merged.
    ```bash
    git checkout develop
    git pull origin develop
    git branch -d feat/PROJ-123-my-feature
    git push origin --delete feat/PROJ-123-my-feature
    ```

## Questions?

If you have questions about the process or a specific issue, feel free to ask in the issue comments or the project's communication channel (e.g., Slack).