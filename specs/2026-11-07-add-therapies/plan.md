# Plan for add-therapies

This work addresses roadmap phase 3: "Add therapies".

1. Inspect the existing dashboard, ailment views, and data structures
   - Identify the current UI patterns and how ailments are represented.
   - Reuse the existing application structure and data where practical.

2. Display available therapies
   - Add a therapies view or section consistent with the existing application.
   - Present the available therapies clearly using the project's established UI patterns.

3. Show therapy-to-ailment relationships
   - Make each therapy's related ailment or ailments clear.
   - Keep relationships understandable without requiring users to infer them.

4. Handle responsive and empty states
   - Keep therapy content usable on phone, tablet, and desktop widths without horizontal overflow.
   - Provide a clear empty state when no therapies are available.
   - Preserve basic accessibility, including semantic structure and usable controls if present.

5. Validate implementation readiness
   - Add or update focused frontend tests for therapy display and ailment relationships.
   - Run the Vitest suite from `frontend/` and verify the feature is ready to merge.
