# Training Notes

## 1. Why is `.claude/settings.local.json` ignored?

`.gitignore` excludes `.claude/settings.local.json` (via the `*.local` pattern) because it holds per-developer, per-machine permission overrides and preferences — things like which Bash commands are pre-approved on *my* machine. That's local configuration, not shared project policy, so committing it would leak one person's environment/settings into the repo and cause churn/conflicts for every other contributor. The shared, reviewed rules live in `.claude/settings.json` (and `AGENTS.md`/`CLAUDE.md`) instead.

## 2. What did `/review` report?

Ran `/review` (whole repo) after applying the fixes below:

- **Lint:** `npm run lint` — pass, no errors or warnings.
- **Tests:** `npm test` — pass, 3 suites / 19 tests, 0 failures.
- **AGENTS.md rule check:**
  - Code Style (2-space indent, no default exports, small focused functions) — no violations. `module.exports = app` and `module.exports = { validateTask }` are plain CommonJS exports, not ES `export default`.
  - Testing Rules (every route has tests, tests run after changes) — all three routes (`GET /tasks`, `POST /tasks`, `DELETE /tasks/:id`) have tests, and tests were run after the validator fix.
  - Do Not (no manual `package-lock.json` edits, no secrets, no editing tests just to make them pass) — none violated; new tests were added, none were edited to force a pass.
- Non-blocking note: `src/app.test.js` and `src/tests/app.test.js` are duplicate files with identical content, likely left over from moving tests into `src/tests/`. Not an AGENTS.md violation, just a cleanup item.

Conclusion: no AGENTS.md rule violations found; lint and tests both pass.

## 3. One thing Claude got wrong and how it was corrected

The original `validateTask` in `src/src/validators.js` only checked `!title` and `title.length` against bounds. That's wrong in two ways:
- **No type check** — any value with a numeric `.length` in range (or truthy with `.length` undefined skipping via `!title`) could sneak past intent; only `typeof title === "string"` is actually a valid title.
- **No trimming** — a whitespace-only string like `"   "` has `.length` 3+ so it passed validation and got stored as the task title verbatim, including any accidental leading/trailing whitespace on otherwise-valid titles.

Correction: added an explicit `typeof title !== "string"` rejection, then `trim()` the title before checking length bounds and before returning/storing it, so whitespace-only titles are rejected and real titles are stored trimmed. Added three new tests in `src/tests/validators.test.js` to cover this: reject non-string title, reject whitespace-only title, and trim surrounding whitespace on a valid title.
