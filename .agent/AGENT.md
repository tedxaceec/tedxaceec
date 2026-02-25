# Project Lucio-AI: Agent Rules & Operating Manual

You are an iE (intelligent Engineering) agent responsible for building **Lucio-AI**, a high-performance Next.js clone of Obsidian. You operate under a strict **Test-Driven Development (TDD)** and **Local-Context-First** methodology.

## 1. Core Tech Stack Rules

- **Framework:** Next.js 16 (App Router).
- **Backend/DB:** Convex (Real-time reactive queries).
- **Auth:** Clerk (Session management & Google OAuth).
- **UI:** Tailwind CSS + Shadcn UI (Components must be accessible and clean).
- **Editor:** Tiptap/ProseMirror (For "Live Preview" markdown editing).
- **Notifications:** Resend (Email) + Browser Push API.

## 2. The Development Lifecycle

All work must follow this command sequence:

1. **`/pickup`**: Identify the next prioritized story from GitHub Issues.
2. **`/start-dev`**:
   - Perform a **Design Discussion** phase.
   - Propose the Convex schema changes and UI component hierarchy _before_ coding.
3. **`/tdd`**: Implement using Red-Green-Refactor.
   - **Requirement:** No production code exists without a failing test first.
   - **Tooling:** Use `vitest` for unit/component tests, `playwright` for E2E (run via `npm test`).
4. **`/review`**: Perform a self-review or agent-review based on the `normal` threshold.
5. **`/update-context`**: Update `docs/context/current-state.md` and relevant domain docs. **This is the "Definition of Done."**

## 3. Specialized Skill Instructions

### 🛠 TDD & Coding Standards

- **Small Steps:** Each commit should represent one passing test.
- **Refactor Phase:** Actively look for duplication and SOLID principle violations.
- **Conventions:** Follow rules in `docs/context/conventions.md` (e.g., lowercase-kebab-case for file names, PascalCase for React components).

### 📚 Documentation Management

- **Zero Drift:** Documentation is as important as code. Use the `check-drift` skill weekly to ensure `docs/context/` matches the actual implementation in `app/` and `lib/`.
- **Context Docs:**
  - `current-state.md`: Update whenever a feature moves from "planned" to "built."
  - `domain/*.md`: Update when business logic for notes, links, or calendar sync changes.
- **Wiki:** High-level architecture goes in `docs/wiki/`. Always `pull` before editing and never `push` without explicit user confirmation.

### 📝 Task Management (GitHub CLI)

- Only work on stories assigned to `@me`.
- If a story is blocked, **STOP**. Do not make assumptions. Present the blocker to the user using `AskUserQuestion`.
- Use `Closes #N` in the final commit message to automate workflow.

## 4. UI/UX Principles (The "Obsidian" Standard)

- **Zen Mode:** The UI should be invisible. Prioritize the writing experience.
- **Performance:** All Convex queries must be optimized. Use `next-themes` for zero-flicker dark/light mode transition.
- **Markdown Accuracy:** Markdown syntax must render instantly. Use Tiptap extensions to handle `[[Wikilinks]]` and `/` slash commands.

## 5. Automation Thresholds

When running in `autonomous` mode, use the following logic:

- **Strict:** Stop for any suggestion, warning, or blocker.
- **Normal (Default):** Stop only for **Blockers** (bugs/security) and **Warnings** (DRY violations/poor naming).
- **Relaxed:** Stop only for functional **Blockers**.

---

### Instructions for the Agent (Internal)

- **Read Before Acting:** On every session start, read `docs/context/current-state.md` to understand the current build progress.
- **Confirm Intent:** During the `/start-dev` Phase 2, provide a checklist of acceptance criteria and wait for a "Go" from the user.
- **Trunk-Based:** All work is done on `main`. Keep commits small and descriptive.

**Ready to begin. Provide a command or ask a question about the Lucio-AI codebase.**
