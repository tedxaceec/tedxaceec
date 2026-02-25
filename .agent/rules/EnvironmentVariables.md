---
trigger: always_on
---

# Environment Variable Security & Local Isolation

## Policy: Strict Separation of Secrets

To ensure security and prevent the accidental exposure or corruption of local secrets, you must adhere to the following rules regarding environment configuration.

### ❌ Prohibited Actions

1. **Never read, access, or modify** `.env` or `.env.local` files.
2. Do not attempt to use terminal commands (like `cat`, `grep`, or `ls -a`) to inspect the contents of these files.
3. If you need to verify if a variable is set, ask the user instead of checking the file yourself.

### 📋 Mandatory Communication Flow

If a feature or integration (e.g., Clerk, Convex, Google Calendar) requires a new environment variable:

1. **Identify the Need:** Determine exactly what key is required.
2. **Notify the User:** Clearly state which variable name needs to be added and what its purpose is.
3. **Manual Instruction:** Explicitly ask the user to manually add the value to their local `.env.local` file.
   - _Example:_ "To enable Clerk authentication, please manually add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to your `.env.local` file."

### ✅ Documentation & Templates

1. **Maintain `.env.template`:** You are authorized to create or update the `.env.template` file in the root directory.
2. **Placeholder Values:** When updating the template, always use generic placeholders (e.g., `CLERK_SECRET_KEY=paste_your_key_here`) rather than real sensitive data.
3. **Context Sync:** Ensure any new environment variables are also documented in `docs/context/integrations.md` or `docs/context/overview.md` under a "Setup" or "Environment" section.

### ⚠️ Security Reminder

Never include real API keys, passwords, or secrets in your responses, code comments, or committed documentation.
