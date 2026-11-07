# Requirements: frontend-bootstrap

## Feature summary
The frontend bootstrap feature establishes the initial web application foundation for AgentClinic so staff can open the product in a modern browser and begin using a basic clinic dashboard shell.

This feature is aligned with the next roadmap item in `specs/roadmap.md`: "Set up the frontend".

## Scope
### In scope
- Create a TypeScript-based frontend using React and Vite.
- Confirm the app runs successfully in a modern browser.
- Deliver a minimal AgentClinic home page as the first user-facing experience.
- Provide a basic dashboard shell and navigation scaffolding.
- Establish a visual foundation that can support later phases.
- Keep the implementation readable, maintainable, and ready for extension.

### Out of scope
- Selecting or implementing a backend API.
- Finalizing authentication or storage systems.
- Building appointment booking, ailment management, or therapy workflows in detail.
- Expanding the feature set beyond the initial clinic dashboard foundation.

## Product context
AgentClinic exists to help agents and clinic staff understand care needs, find suitable therapies, and book appointments. The first technological milestone is creating a reliable frontend shell that supports these future workflows without locking the product into premature architectural decisions.

## Decisions
- Use TypeScript as the application language.
- Use React with Vite for the frontend stack.
- Use Vitest to run automated frontend tests for validation.
- Favor a simple, trustworthy UI shell that is clearly structured for future features.
- Include a minimal AgentClinic home page as the first landing experience for users.
- Keep backend, API, database, hosting, and authentication choices intentionally deferred until product workflows are clearer.

## Constraints
- The app must be usable in a modern browser.
- The implementation should align with the mission and principles in `specs/mission.md`.
- The stack should remain consistent with `specs/tech-stack.md`.
- Feature work should keep the project ready for the next roadmap phase rather than solving future phases prematurely.
