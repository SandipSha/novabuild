# Contributing to NovaBuild

Guidelines for working on the NovaBuild Digital website as a team.

## Branching Strategy

- **`main`** — Production-ready code only. This branch is protected: no direct
  commits. All changes land here via reviewed Pull Requests.
- **`feature/<feature-name>`** — All new work happens on a feature branch cut
  from `main`, e.g.:
  - `feature/form-abandonment`
  - `feature/auto-tab-rotation`
  - `feature/interactive-time-slots`

  Use `fix/<bug-name>` for bug fixes and `chore/<task-name>` for maintenance
  work that isn't a feature or fix.

## Workflow

1. Pull the latest `main`: `git checkout main && git pull`
2. Create your branch: `git checkout -b feature/your-feature-name`
3. Commit locally as you work (see commit convention below).
4. Test your changes (`npm run build`, `npm run lint`, manual QA in the browser).
5. Push your branch: `git push -u origin feature/your-feature-name`
6. Open a Pull Request into `main`.
7. Address review feedback. At least one peer review approval is required
   before merging.
8. Merge via the PR (prefer "Squash and merge" to keep `main` history clean),
   then delete the feature branch.

## Commit Message Convention

Prefix every commit with the type of change:

| Prefix       | Use for                                                |
| ------------ | ------------------------------------------------------- |
| `feat:`      | A new feature                                           |
| `fix:`       | A bug fix                                               |
| `refactor:`  | Code change that neither fixes a bug nor adds a feature |
| `docs:`      | Documentation-only changes                              |
| `style:`     | Formatting, whitespace, missing semicolons, etc.        |
| `test:`      | Adding or updating tests                                 |
| `chore:`     | Build process, tooling, or dependency updates            |

Example: `feat: add debounced form-abandonment lead capture`

## Pull Request Checklist

- [ ] Branch is up to date with `main`
- [ ] `npm run build` passes locally
- [ ] `npm run lint` passes locally
- [ ] Changes were manually verified in the browser
- [ ] No secrets or `.env` values committed
