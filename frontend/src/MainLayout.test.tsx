import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import MainLayout from './MainLayout'

describe('MainLayout', () => {
  it('renders header, main content, and footer in order', () => {
    const markup = renderToStaticMarkup(
      <MainLayout>
        <p>Dashboard content</p>
      </MainLayout>,
    )

    const headerPosition = markup.indexOf('<header')
    const mainPosition = markup.indexOf('<main')
    const footerPosition = markup.indexOf('<footer')

    expect(headerPosition).toBeGreaterThanOrEqual(0)
    expect(mainPosition).toBeGreaterThan(headerPosition)
    expect(footerPosition).toBeGreaterThan(mainPosition)
    expect(markup).toContain('<p>Dashboard content</p>')
  })
})
