import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('AgentClinic dashboard', () => {
  it('introduces the clinic and offers primary actions', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('<h1>Support every agent')
    expect(markup).toContain('Open dashboard')
    expect(markup).toContain('Explore care flow')
  })

  it('displays the care queue with agent details and statuses', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('Nova-7')
    expect(markup).toContain('Memory drift')
    expect(markup).toContain('Needs review')
    expect(markup).toContain('Atlas-3')
  })

  it('shows clinic metrics and upcoming session details', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('aria-label="Key metrics"')
    expect(markup).toContain('Agents in care')
    expect(markup).toContain('184')
    expect(markup).toContain('Upcoming care sessions')
    expect(markup).toContain('Therapy review')
    expect(markup).toContain('Scheduled')
  })

  it('links to the therapies section from the dashboard navigation', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('href="#therapies">Therapies</a>')
    expect(markup).toContain('id="therapies"')
  })
})
