# Requirements: add-therapies

## Feature summary
Add a way to view available therapies and understand their relationships to ailments. This is roadmap phase 3 in `specs/roadmap.md`.

## Scope
### In scope
- Display the available therapies using existing application patterns and data.
- Clearly show the ailment or ailments associated with each therapy.
- Keep the experience responsive across phone, tablet, and desktop sizes.
- Provide a clear empty state when there are no available therapies.
- Preserve basic accessibility and the existing user experience.

### Out of scope
- Appointment selection or booking.
- Backend, API, storage, or authentication decisions and implementation.
- Therapy creation or editing workflows.
- Changes to agent or ailment workflows beyond what is needed to show therapy relationships.

## Product context
AgentClinic helps agents and staff understand care needs and find suitable therapies. The experience should make care and next steps easy to understand and keep staff workflows reliable and straightforward, in line with `specs/mission.md`.

## Decisions
- Keep the feature focused on displaying available therapies and their ailment relationships.
- Follow the application's existing UI and data patterns rather than introducing a new architecture.
- Do not select or add backend infrastructure; backend and persistence choices remain deferred as described in `specs/tech-stack.md`.
- Use the existing TypeScript, React, Vite, and Vitest stack.

## Constraints
- Therapy-to-ailment relationships must be clear to users.
- The UI must remain usable at phone, tablet, and desktop widths without horizontal overflow.
- Implementation should align with `specs/mission.md` and `specs/tech-stack.md`.
- Do not implement appointment booking or other later roadmap phases.
