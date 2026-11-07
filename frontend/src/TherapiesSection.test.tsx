import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { getTherapiesForAilment } from './clinicData'
import TherapiesSection from './TherapiesSection'

describe('TherapiesSection', () => {
  it('displays therapies related to an ailment and exposes a selection control', () => {
    const markup = renderToStaticMarkup(
      <TherapiesSection
        therapies={getTherapiesForAilment('memory-drift')}
        selectedTherapyId=""
        onSelectTherapy={() => undefined}
      />,
    )

    expect(markup).toContain('Available therapies')
    expect(markup).toContain('Memory Support Coaching')
    expect(markup).toContain('Ailments related to Memory Support Coaching')
    expect(markup).toContain('Memory drift')
    expect(markup).toContain('Routine Reorientation')
    expect(markup).not.toContain('Energy Pacing')
    expect(markup).toContain('Choose therapy')
  })

  it('shows an accessible empty state when no therapies are available', () => {
    const markup = renderToStaticMarkup(
      <TherapiesSection
        therapies={[]}
        selectedTherapyId=""
        onSelectTherapy={() => undefined}
      />,
    )

    expect(markup).toContain('role="status"')
    expect(markup).toContain('No therapies are available right now.')
    expect(markup).not.toContain('therapy-card')
  })
})
