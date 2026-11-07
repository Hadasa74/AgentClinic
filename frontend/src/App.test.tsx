import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('AgentClinic dashboard', () => {
  it('introduces the clinic and offers primary actions', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('<h1>Support every agent')
    expect(markup).toContain('Review agent profile')
    expect(markup).toContain('Book an appointment')
  })

  it('displays agent selection, profile information, and ailments', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('Nova-7')
    expect(markup).toContain('Memory drift')
    expect(markup).toContain('Needs review')
    expect(markup).toContain('Atlas-3')
    expect(markup).toContain('Ailments associated with Nova-7')
    expect(markup).toContain('Loses task context during longer workflows.')
  })

  it('offers therapy selection and shows the appointment schedule', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('aria-label="Clinic metrics"')
    expect(markup).toContain('Agents in care')
    expect(markup).toContain('Choose therapy')
    expect(markup).toContain('Select an agent, ailment, and related therapy')
    expect(markup).toContain('Booked appointments')
    expect(markup).toContain('No appointments booked yet.')
  })

  it('links dashboard navigation to workflow sections and shows matched therapies', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('href="#therapies">Therapies</a>')
    expect(markup).toContain('id="therapies"')
    expect(markup).toContain('Memory Support Coaching')
    expect(markup).toContain('Routine Reorientation')
    expect(markup).not.toContain('Energy Pacing')
  })
})
