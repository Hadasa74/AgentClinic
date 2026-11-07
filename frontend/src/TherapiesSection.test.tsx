import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import TherapiesSection from './TherapiesSection'

describe('TherapiesSection', () => {
  it('displays therapies with their related ailments', () => {
    const markup = renderToStaticMarkup(<TherapiesSection />)

    expect(markup).toContain('Available therapies')
    expect(markup).toContain('Memory Support Coaching')
    expect(markup).toContain('Ailments related to Memory Support Coaching')
    expect(markup).toContain('Memory drift')
    expect(markup).toContain('Energy Pacing')
    expect(markup).toContain('Low energy')
    expect(markup).toContain('Routine check-in')
  })

  it('shows an accessible empty state when no therapies are available', () => {
    const markup = renderToStaticMarkup(<TherapiesSection therapies={[]} />)

    expect(markup).toContain('role="status"')
    expect(markup).toContain('No therapies are available right now.')
    expect(markup).not.toContain('therapy-card')
  })
})
