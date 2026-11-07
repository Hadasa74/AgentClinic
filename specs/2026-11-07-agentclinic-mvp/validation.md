# Validation: AgentClinic MVP

## Definition of done
A staff user can complete the care workflow using fictional demo data: select an agent, review their profile and ailment, choose a related therapy and available appointment slot, confirm the booking, and find that booking in the schedule after reloading the application.

## Required validation
1. The dashboard provides clear navigation to agent/profile, ailment, therapy, and appointment information.
2. Selecting an agent exposes their profile and associated ailments.
3. Therapy-to-ailment relationships are clear, and booking offers therapies related to the selected ailment.
4. Staff can book only with the required selections and an available predefined slot.
5. A confirmed booking appears in the schedule, survives a page reload, and makes its slot unavailable for another booking.
6. Invalid, missing, or unavailable selections cannot produce a success confirmation.
7. Empty catalog/slot states and `localStorage` read/write failures are clearly communicated; storage failures must not be silently treated as a successful booking.
8. The complete workflow is covered by focused frontend tests and manually smoke-tested in a modern browser.
9. The UI remains usable at representative phone (320px), tablet (768px), and desktop (1280px) widths without page-level horizontal scrolling.
10. Basic accessibility is reviewed, including semantic headings and controls, labels, keyboard operation, and visible focus.
11. From `frontend/`, `npm test`, `npm run build`, and `npm run lint` pass.

## Merge criteria
The MVP can be merged when:
- The complete staff workflow succeeds from agent selection through appointment confirmation.
- Booking records persist across reloads in the current browser and unavailable slots cannot be booked again.
- Therapy/ailment relationships, validation, empty states, and storage errors behave as specified.
- Focused tests, the frontend build, and lint pass.
- Responsive and basic accessibility checks pass at the specified viewport sizes.
- The implementation remains within the single-staff, fictional-data MVP scope and introduces no unnecessary backend or authentication infrastructure.
