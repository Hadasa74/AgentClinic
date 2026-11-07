# Validation: add-therapies

## Definition of done
Staff can view available therapies and clearly understand their relationships to ailments, with a responsive and accessible experience consistent with AgentClinic.

## Required validation
1. Available therapies are displayed using existing application patterns and data.
2. The relationship between each displayed therapy and its associated ailment or ailments is clear.
3. An understandable empty state is shown when no therapies are available.
4. The feature remains usable at phone, tablet, and desktop viewport widths without horizontal overflow.
5. Basic accessibility is covered, including appropriate semantic structure and keyboard usability for any interactive elements.
6. Relevant frontend tests cover therapy display and therapy-to-ailment relationships.
7. The Vitest suite passes when run from `frontend/` with `npm test`.

## Merge criteria
The feature can be merged when:
- Relevant frontend tests and the Vitest suite pass.
- Therapy-to-ailment relationships render correctly and are understandable.
- Empty-state behavior is present.
- Phone, tablet, and desktop layouts have no horizontal overflow.
- Basic accessibility checks pass.
- The implementation remains within the agreed display-only scope and does not introduce backend or booking work.
