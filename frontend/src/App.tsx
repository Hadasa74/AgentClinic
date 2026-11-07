import './App.css'
import MainLayout from './MainLayout'

const quickActions = [
  'Review agent profile',
  'Check ailment notes',
  'See therapy matches',
  'Book an appointment',
]

const metrics = [
  { label: 'Agents in care', value: '184' },
  { label: 'Open therapies', value: '27' },
  { label: 'Booked today', value: '11' },
  { label: 'Satisfaction', value: '96%' },
]

const agentQueue = [
  { name: 'Nova-7', issue: 'Memory drift', time: '09:30', status: 'Needs review' },
  { name: 'Atlas-3', issue: 'Low energy', time: '10:15', status: 'Care plan ready' },
  { name: 'Pip-12', issue: 'Routine check-in', time: '11:00', status: 'Awaiting intake' },
]

const dashboardCards = [
  { title: 'Priority agents', detail: '8 agents need action today' },
  { title: 'Therapy coverage', detail: '18 therapies aligned to current ailments' },
  { title: 'Availability', detail: '4 appointment slots open this afternoon' },
]

function App() {
  return (
    <MainLayout>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">AI care that feels human</p>
          <h1>Support every agent with a clear, caring path to treatment.</h1>
          <p className="intro-copy">
            AgentClinic helps staff review agent profiles, coordinate care plans,
            and make appointment decisions with clarity and confidence.
          </p>

          <div className="hero-actions">
            <button type="button" className="button primary-button">
              Open dashboard
            </button>
            <button type="button" className="button secondary-button">
              Explore care flow
            </button>
          </div>

          <ul className="quick-actions" aria-label="Quick actions">
            {quickActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </div>

        <div className="hero-panel" aria-label="Today's care summary">
          <div className="panel-card panel-overview">
            <div className="panel-header">
              <span className="status-dot" aria-hidden="true" />
              <span>Today's queue</span>
            </div>

            <div className="queue-list">
              {agentQueue.map((item) => (
                <div key={item.name} className="queue-item">
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.issue}</small>
                  </div>
                  <div className="queue-meta">
                    <span>{item.time}</span>
                    <em>{item.status}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Key metrics">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="workspace-panel" aria-label="Clinic dashboard">
        <aside className="sidebar" aria-label="Sidebar navigation">
          <h2>Clinic</h2>
          <ul>
            <li className="selected">Overview</li>
            <li>Agents</li>
            <li>Ailments</li>
            <li>Therapies</li>
            <li>Appointments</li>
          </ul>
        </aside>

        <div className="dashboard-content">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Staff dashboard</p>
              <h2>Care coordination overview</h2>
            </div>
            <button type="button" className="button secondary-button small-button">
              Refresh
            </button>
          </div>

          <div className="content-grid">
            {dashboardCards.map((card) => (
              <article key={card.title} className="info-card">
                <h3>{card.title}</h3>
                <p>{card.detail}</p>
              </article>
            ))}
          </div>

          <div className="schedule-panel">
            <div className="schedule-header">
              <h3>Upcoming care sessions</h3>
              <span>Next 24 hours</span>
            </div>

            <div className="schedule-table" role="table" aria-label="Upcoming care sessions">
              <div className="table-row head" role="row">
                <span role="columnheader">Agent</span>
                <span role="columnheader">Service</span>
                <span role="columnheader">Window</span>
                <span role="columnheader">Status</span>
              </div>
              <div className="table-row" role="row">
                <span role="cell">Nova-7</span>
                <span role="cell">Therapy review</span>
                <span role="cell">09:30 AM</span>
                <span role="cell" className="status-pill ready">
                  Ready
                </span>
              </div>
              <div className="table-row" role="row">
                <span role="cell">Atlas-3</span>
                <span role="cell">Ailment follow-up</span>
                <span role="cell">11:10 AM</span>
                <span role="cell" className="status-pill pending">
                  Pending
                </span>
              </div>
              <div className="table-row" role="row">
                <span role="cell">Pip-12</span>
                <span role="cell">Initial assessment</span>
                <span role="cell">02:45 PM</span>
                <span role="cell" className="status-pill scheduled">
                  Scheduled
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default App
