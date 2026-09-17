# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is an early-stage scaffold for a Node.js REST API ("task-api") built on Express 5. `src/app.js` currently exists but is empty — there is no implemented API, routing, or entry point yet. There are no source files beyond this, and no commits in git history to reference.

## Commands

- `npm test` — run tests with Jest
- `npm test -- <path-or-pattern>` — run a single test file or matching tests
- `npm run lint` — run ESLint over the project

## Stack

- Node.js, CommonJS modules (`"type": "commonjs"` in package.json)
- Express 5 (`express`) for the HTTP layer
- Jest + Supertest for testing (Supertest is intended for HTTP-level integration tests against the Express app)
- ESLint (flat config in `eslint.config.js`) — enforces `no-unused-vars` and `no-undef` as errors; globals are explicitly allow-listed (console, process, module, require, __dirname, plus Jest globals like describe/test/expect/beforeEach/afterEach)

## Code style

- Use 2-space indentation.
- Do not use default exports.
- Keep functions small and focused.

## Testing rules

- Every API route must have tests.
- Run tests after making code changes.

## Do not

- Never edit `package-lock.json` manually.
- Never commit secrets.
