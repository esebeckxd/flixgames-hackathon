<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Changelog is mandatory

This repo is built by multiple humans and multiple AI tools in parallel. Before doing anything, read the
`[Unreleased]` section of [`CHANGELOG.md`](CHANGELOG.md) to see what's already in place or faked. Before
you finish your turn/session, add an entry there for every change you made — see "Changelog discipline"
in [`CLAUDE.md`](CLAUDE.md) for the exact format and rules. This is not optional and applies to every
agent regardless of tool.

# No branches — work on `main`, commit and push immediately

**Branches are forbidden in this repo.** Every human and every AI agent commits **directly to `main`**
and **pushes immediately** after every change — do not open a feature/topic branch, do not leave commits
unpushed "for later," do not batch changes into a branch for a PR. See "No branches" in
[`CLAUDE.md`](CLAUDE.md) for the full rule and the reasoning. This is technically enforced by a git
hook (`.githooks/pre-commit` / `pre-push`, installed via `npm install`) that blocks commits/pushes on any
branch other than `main` — if it blocks you, switch to `main` and merge your work there, don't bypass it
with `--no-verify`.
