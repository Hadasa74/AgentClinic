# Plan for AgentClinic MVP

This work completes the staff-facing care workflow across the remaining AgentClinic roadmap phases, building on the existing frontend and therapy section.

1. Define the MVP domain and demo data
   - Model agents, profiles, ailments, therapies, their relationships, appointment slots, and bookings with TypeScript types.
   - Create a small, coherent set of fictional records and predefined slots for the full staff workflow.

2. Complete staff agent and ailment views
   - Add navigable agent selection and profile details to the existing dashboard.
   - Show each selected agent's ailments and provide clear paths to therapy and booking steps.

3. Connect therapies to agent needs
   - Reuse the therapy catalog and make ailment relationships explicit.
   - Show relevant therapy choices for the selected agent and ailment, including a useful state when none are related.

4. Implement appointment booking
   - Let staff select a related therapy and an available predefined slot.
   - Validate required selections and availability before confirming.
   - Show a clear confirmation and include the booking in the appointment schedule.

5. Persist bookings for the single-browser MVP
   - Save and restore confirmed bookings using `localStorage`.
   - Keep booked slots unavailable after reload and report invalid or inaccessible saved data without claiming a booking succeeded.

6. Complete responsive and accessible workflow states
   - Ensure navigation and workflow sections work at phone, tablet, and desktop widths.
   - Add clear loading, empty, validation, and storage-error feedback where applicable.
   - Preserve semantic structure, keyboard access, and visible focus.

7. Verify MVP readiness
   - Add focused tests for agent/ailment relationships, therapy matching, booking validation, slot availability, and persistence behavior.
   - Run frontend tests, build, and lint; review the complete workflow and responsive behavior before merge.
