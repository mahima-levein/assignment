# CLAUDE.md

@AGENTS.md

## Claude Code specifics

- Slash command: `/review [file]` — runs lint + tests and checks the code (or just `[file]`, if given) against every rule in AGENTS.md.
- Subagent: `test-writer` (tools: Read, Write, Edit, Bash) — writes Jest/Supertest tests for Express API routes; restricted so it can't touch unrelated parts of the repo.
