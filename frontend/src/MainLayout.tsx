import type { ReactNode } from 'react'
import './MainLayout.css'

type MainLayoutProps = {
  children: ReactNode
}

function Header() {
  return (
    <header className="topbar">
      <div className="brand-block">
        <div className="brand-mark">A</div>
        <div>
          <div className="brand-name">AgentClinic</div>
          <div className="brand-subtitle">Care coordination</div>
        </div>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        <a href="#">Home</a>
        <a href="#">Agents</a>
        <a href="#">Ailments</a>
        <a href="#">Therapies</a>
        <a href="#">Appointments</a>
      </nav>

      <div className="topbar-actions">
        <button type="button" className="button secondary-button">
          Sign in
        </button>
        <button type="button" className="button primary-button">
          Book visit
        </button>
      </div>
    </header>
  )
}

function Main({ children }: MainLayoutProps) {
  return <main className="page-layout">{children}</main>
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>AgentClinic</span>
      <span>Care coordination for every agent.</span>
    </footer>
  )
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="clinic-app-shell">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}

export default MainLayout
