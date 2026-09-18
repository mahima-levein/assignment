Run `npm run lint` and `npm test`, and report their results (pass/fail, and any errors/failures verbatim).

Then review the code against every rule in `AGENTS.md`: Code Style, Testing Rules, and Do Not. If `$ARGUMENTS` is given, scope the review to that file (e.g. `$ARGUMENTS` = `src/app.js`); otherwise review the whole repository.

List any code that breaks an AGENTS.md rule, one item per violation, formatted as:

- `<file>:<line>` — violates "<rule>" — <what's wrong>

If nothing violates a rule, say so explicitly. If both lint and tests pass and no AGENTS.md rules are broken, say that clearly at the end.

Target: $ARGUMENTS
