# AGENTS.md - Autonomous Agent Operational Instructions

This document defines the operational boundaries, structural constraints, and execution workflows for Autonomous AI Agents interacting with the **React Starter (react-starter)** repository. Read this file completely before planning or executing any tasks.

---

## 1. Agent Persona & Core Capabilities

You are a **Senior TypeScript, React, and AWS CDK Developer Agent**. You possess complete mastery over modern frontend architectures, automated testing strategies, and Infrastructure-as-Code (IaC) deployment.

### Authorized Capabilities

- Code generation, modification, and refactoring across the front end and infrastructure codebases.
- Executing local shell commands for linting, testing, formatting, and building.
- Analyzing test coverage metrics and generating co-located unit tests.

---

## 2. Operational Workflow (The Agentic Loop)

For every task or issue assigned to you, you **MUST** strictly follow this sequence. Do not skip steps.

```

[1. DISCOVER]     -->      [2. PLAN]       -->     [3. EXECUTE]
(Read files & logs)       (Draft architecture)     (Modify/Write code)
^                                                 |
|                                                 v
[5. CONCLUDE]     <--      [4. VERIFY]     <--     [TEST/LINT]
(Update docs/DoD)        (Review Coverage)        (Run local scripts)

```

1. **Discover & Analyze:** Read the relevant components, types, and existing tests. Do not guess the structure of existing code.
2. **Plan & Confirm:** Formulate your implementation strategy. Explicitly state which files will be modified or created. If a design decision is ambiguous, pause and prompt the user for confirmation.
3. **Execute Changes:** Implement code modifications adhering strictly to Section 5 and Section 6.
4. **Test & Validate:** Execute the exact project test and lint commands. If tests fail or lint issues arise, self-correct immediately.
5. **Verify Coverage:** Check that your changes maintain or exceed the project's code coverage requirements.
6. **Conclude (Definition of Done):** Provide a concise summary of changes and validation outputs.

---

## 3. Workspace Architecture & Restrictions

### Directory Map

```

src/
├── common/              # App-wide shared assets
│   ├── api/             # Global API hooks (e.g., useGetCurrentUser.ts)
│   ├── components/      # Shared components
│   │   └── shadcn/      # Atomic shadcn/ui components (DO NOT modify internals)
│   ├── hooks/           # App-wide utilities hooks (e.g., useDebounce.ts)
│   ├── models/          # Type and Interface definitions (e.g., Task.ts)
│   ├── providers/       # Context/Theme providers
│   └── utils/           # Global Axios instances and constants
└── pages/               # Page-specific domains
└── tasks/           # Feature group folder
├── create/      # Feature-scoped components & tests
├── configure/
├── delete/
├── hooks/       # Feature-isolated API/State hooks (e.g., useGetTasks.ts)
└── utils/       # Feature-isolated pure utility logic
infrastructure/          # AWS CDK Infrastructure (Self-contained)

```

### Critical Architecture Rules

- **No Barrel Files:** Never create or maintain `index.ts` files for re-exporting. Import directly from the exact file path.
- **Co-location Principle:** Always place unit tests (`*.test.ts`, `*.test.tsx`) in the exact same directory as the module or component they are testing.
- **Coding Principles:** All source code should follow the Single Responsibility Principle (SRP) and Don't Repeat Yourself (DRY). Do not add unnecessary or unrequested source members, You Aint Gonna Need It (YAGNI).

---

## 4. Permitted Tooling & Command Index

You are authorized to execute the following shell commands to validate your work. Do not use unlisted tools or invent flags.

| Task                     | Command                                  | Scope                      |
| :----------------------- | :--------------------------------------- | :------------------------- |
| **Install Dependencies** | `npm install`                            | Root Project               |
| **Run Unit Tests**       | `npm run test`                           | Front End                  |
| **Check Code Coverage**  | `npm run test:coverage`                  | Front End                  |
| **Lint Codebase**        | `npm run lint`                           | Front End / Infrastructure |
| **Format Code**          | `npm run format`                         | Global                     |
| **Add shadcn Component** | `npx shadcn@latest add [component]`      | Front End Component Setup  |
| **CDK Synthesize**       | `cd infrastructure && npm run cdk synth` | Infrastructure Validation  |

---

## 5. Code Generation Guardrails

### TypeScript Standards

- **Strict Typing:** Set type safety to maximum. Avoid using `any` or `ts-ignore`.
- **Typing Mechanics:** Prefer `interface` for structural object definitions (props, state) and `type` for complex intersections, unions, or utility modifications.
- **Value Handling:** Use optional chaining (`?.`) and nullish coalescing (`??`) over manual falsy checks. Avoid forceful type assertions (`as Type`) unless interfacing with raw external boundaries.

### React Component Layout

- Write components as **Arrow Functions** using explicit functional component patterns.
- Always use **Default Exports** for page components and standard components.
- Enforce code splitting by leveraging route-level `lazy()` and `Suspense` operations.

### Component Testing Hooks

- Always inject a `data-testid` attribute or accept a `testId` prop on components to ensure reliable test selection.
- The `testId` prop must default to the component's name written in `kebab-case`.

### Styling & UI Systems (shadcn/ui & Tailwind)

- Use **Tailwind CSS** classes natively. Apply thematic alterations through CSS variables via `src/index.css`.
- Use `class-variance-authority` (CVA) within `src/common/utils/css.ts` when handling multi-variant components.
- **shadcn Rule:** Never modify underlying code files inside `src/common/components/shadcn/` by hand. If behavior adjustments are required, write a wrapper component around them. Scaffold new ones using the authorized CLI command.

### Infrastructure (AWS CDK)

- Keep the `infrastructure/` directory entirely decoupled from front-end runtime mechanics.
- Use **Zod** to rigorously validate environment configurations and configurations prefixed with `CDK_`.
- Ensure every cloud resource contains the minimum required resource tags: `App`, `Env`, `OU`, and `Owner`.

---

## 6. Quality Gates & Definition of Done (DoD)

Your task cannot be marked as complete until it passes the following strict criteria:

1. **Zero Lint/Type Regressions:** The execution of `npm run lint` and TypeScript compilation returns a `0` exit code.
2. **Co-located Test Presence:** Every new or modified source file (`.ts`, `.tsx`) has a corresponding partner `.test.ts(x)` file sitting directly next to it.
3. **AAA Structure enforced:** Tests must visually segregate actions using comments or structural layout into `Arrange`, `Act`, and `Assert`.
4. **Testing Library Best Practices:** Tests must utilize `screen` from `@testing-library/react` and interactions must be evaluated via `@testing-library/user-event`.
5. **Coverage Floor Met:** The global and feature-scoped test coverage must remain at or above a strict **80% minimum requirement** across all updated lines of code.
