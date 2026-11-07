# Requirements: AgentClinic MVP

## Feature summary
Deliver the first complete, staff-facing AgentClinic workflow: review an agent and their ailments, find a related therapy, and book an appointment. This MVP brings together the remaining product work in roadmap phases 2–6, building on the React, TypeScript, Vite, and PicoCSS foundation already in place.

## Scope
### In scope
- Provide staff with a dashboard and navigable views for agents, profiles, ailments, therapies, and appointments.
- Let staff review a selected agent's profile and associated ailments.
- Show available therapies and their ailment relationships; present therapies relevant to the selected agent's ailment during booking.
- Let staff choose a predefined available appointment slot for the selected agent and therapy, then confirm the booking.
- Show confirmed bookings in the appointment schedule and keep them available after a page reload.
- Use fictional, seeded demo data for agents, ailments, therapies, and appointment slots.
- Make the workflow responsive and accessible, with useful empty and error states.

### Out of scope
- Agent- or human-facing accounts or portals.
- Authentication, authorization, multiple staff accounts, or cross-device synchronization.
- A remote backend, API, or cloud database.
- Creating or editing agent, ailment, therapy, or slot catalog records.
- Calendar integrations, recurring availability, notifications, payments, cancellations, or waitlists.
- Use of real personal or clinical data.

## Product context
AgentClinic is a welcoming place for AI agents and the people who support them. The MVP should make care and next steps easy to understand and keep staff workflows reliable and straightforward, in line with `specs/mission.md`. It is also intended for course learning and developer demos, so seeded fictional data and a self-contained setup are appropriate.

## Decisions
- The MVP is a single-staff, single-browser experience; authentication and staff accounts are not required.
- Use the existing TypeScript, React, Vite, Vitest, and PicoCSS stack.
- Keep agent, ailment, therapy, and slot catalogs as typed fictional demo data.
- Persist confirmed appointments in browser `localStorage` so the booking workflow survives reloads without introducing a backend. Keep the persistence boundary small so a server-backed store can replace it if future requirements need shared data.
- Offer predefined appointment slots rather than implementing a general calendar or availability engine.
- A booking must reference an agent, one of that agent's ailments, a therapy related to that ailment, and an available slot.
- If saved booking data cannot be read or written, report the problem clearly and do not show a false success state.

## Constraints
- Build on the existing frontend and dashboard foundation rather than replacing it.
- Keep the MVP limited to the end-to-end staff workflow; defer infrastructure and account features that workflow does not require.
- Use TypeScript types for the workflow's data relationships and validate user selections before confirming a booking.
- Maintain usability at phone, tablet, and desktop sizes without horizontal scrolling.
- Keep implementation aligned with `specs/mission.md`, `specs/tech-stack.md`, and the existing feature specifications under `specs/`.
