import { useState, type FormEvent } from 'react'
import './App.css'
import MainLayout from './MainLayout'
import {
  agents,
  ailments,
  appointmentSlots,
  getTherapiesForAilment,
  therapies,
  type Agent,
} from './clinicData'
import {
  createBooking,
  loadBookings,
  saveBookings,
  type AppointmentBooking,
} from './bookingStore'
import TherapiesSection from './TherapiesSection'

const initialAgentId = agents[0]?.id ?? ''
const initialAilmentId = agents[0]?.ailmentIds[0] ?? ''

const quickActions = [
  { label: 'Review agent profile', href: '#agents' },
  { label: 'Check ailment notes', href: '#ailments' },
  { label: 'See therapy matches', href: '#therapies' },
  { label: 'Book an appointment', href: '#booking' },
]

type BookingLoadState = {
  bookings: AppointmentBooking[]
  storageStatus: 'loading' | 'ready' | 'error'
  storageError: string
}

function getInitialBookingState(): BookingLoadState {
  if (typeof window === 'undefined') {
    return { bookings: [], storageStatus: 'loading', storageError: '' }
  }

  let storage: Storage
  try {
    storage = window.localStorage
  } catch {
    return {
      bookings: [],
      storageStatus: 'error',
      storageError: 'Browser storage is not available. Saved appointments cannot be loaded.',
    }
  }

  const result = loadBookings(storage)
  if (!result.ok) {
    return { bookings: [], storageStatus: 'error', storageError: result.error }
  }

  return { bookings: result.value, storageStatus: 'ready', storageError: '' }
}

function App() {
  const [selectedAgentId, setSelectedAgentId] = useState(initialAgentId)
  const [selectedAilmentId, setSelectedAilmentId] = useState(initialAilmentId)
  const [selectedTherapyId, setSelectedTherapyId] = useState('')
  const [selectedSlotId, setSelectedSlotId] = useState('')
  const [bookingState, setBookingState] = useState(getInitialBookingState)
  const { bookings, storageStatus, storageError } = bookingState
  const [bookingError, setBookingError] = useState('')
  const [confirmation, setConfirmation] = useState('')

  const selectedAgent = agents.find((agent) => agent.id === selectedAgentId)
  const selectedAilment = ailments.find((ailment) => ailment.id === selectedAilmentId)
  const relatedTherapies = selectedAilment
    ? getTherapiesForAilment(selectedAilment.id)
    : []
  const selectedTherapy = relatedTherapies.find((therapy) => therapy.id === selectedTherapyId)
  const bookedSlotIds = new Set(bookings.map((booking) => booking.slotId))
  const availableSlots = appointmentSlots.filter((slot) => !bookedSlotIds.has(slot.id))
  const selectedSlot = appointmentSlots.find((slot) => slot.id === selectedSlotId)

  function resetBookingSelection() {
    setSelectedTherapyId('')
    setSelectedSlotId('')
    setBookingError('')
    setConfirmation('')
  }

  function handleAgentSelect(agent: Agent) {
    setSelectedAgentId(agent.id)
    setSelectedAilmentId(agent.ailmentIds[0] ?? '')
    resetBookingSelection()
  }

  function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBookingError('')
    setConfirmation('')

    if (!selectedAgent || !selectedAilment || !selectedTherapy || !selectedSlot) {
      setBookingError('Select an agent, an associated ailment, a related therapy, and an available time.')
      return
    }

    const result = createBooking(
      {
        agentId: selectedAgent.id,
        ailmentId: selectedAilment.id,
        therapyId: selectedTherapy.id,
        slotId: selectedSlot.id,
      },
      bookings,
    )
    if (!result.ok) {
      setBookingError(result.error)
      return
    }

    const nextBookings = [...bookings, result.value]
    let storage: Storage
    try {
      storage = window.localStorage
    } catch {
      setBookingState({
        bookings,
        storageStatus: 'error',
        storageError: 'Browser storage is not available. The appointment was not saved.',
      })
      return
    }

    const saveResult = saveBookings(storage, nextBookings)
    if (!saveResult.ok) {
      setBookingState({
        bookings,
        storageStatus: 'error',
        storageError: saveResult.error,
      })
      return
    }

    setBookingState({
      bookings: nextBookings,
      storageStatus: 'ready',
      storageError: '',
    })
    setSelectedSlotId('')
    setConfirmation(
      `Appointment booked for ${selectedAgent.name}: ${selectedTherapy.name}, ${selectedSlot.date} at ${selectedSlot.time}.`,
    )
  }

  const scheduledAppointments = bookings.flatMap((booking) => {
    const agent = agents.find((item) => item.id === booking.agentId)
    const ailment = ailments.find((item) => item.id === booking.ailmentId)
    const therapy = therapies.find((item) => item.id === booking.therapyId)
    const slot = appointmentSlots.find((item) => item.id === booking.slotId)

    if (!agent || !ailment || !therapy || !slot) {
      return []
    }

    return [{ booking, agent, ailment, therapy, slot }]
  })

  const metrics = [
    { label: 'Agents in care', value: agents.length },
    { label: 'Available therapies', value: therapies.length },
    { label: 'Appointments booked', value: bookings.length },
    { label: 'Open time slots', value: availableSlots.length },
  ]

  return (
    <MainLayout>
      <section className="hero-section" id="dashboard">
        <div className="hero-copy">
          <p className="eyebrow">AI care that feels human</p>
          <h1>Support every agent with a clear, caring path to treatment.</h1>
          <p className="intro-copy">
            Review agent needs, find related therapies, and coordinate the next
            appointment from one staff workspace.
          </p>

          <div className="hero-actions">
            <a className="button primary-button" href="#agents">
              Open dashboard
            </a>
            <a className="button secondary-button" href="#booking">
              Explore care flow
            </a>
          </div>

          <ul className="quick-actions" aria-label="Care workflow">
            {quickActions.map((action) => (
              <li key={action.href}>
                <a href={action.href}>{action.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <aside className="hero-panel" aria-label="Agent care queue">
          <div className="panel-card panel-overview">
            <div className="panel-header">
              <span className="status-dot" aria-hidden="true" />
              <span>Agents in care</span>
            </div>

            <div className="queue-list">
              {agents.map((agent) => (
                <div key={agent.id} className="queue-item">
                  <div>
                    <strong>{agent.name}</strong>
                    <small>{agent.role}</small>
                  </div>
                  <div className="queue-meta">
                    <span>{agent.ailmentIds.length} {agent.ailmentIds.length === 1 ? 'ailment' : 'ailments'}</span>
                    <em>{agent.status}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="metrics-grid" aria-label="Clinic metrics">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="workspace-panel" aria-label="Clinic dashboard">
        <aside className="sidebar" aria-label="Clinic navigation">
          <h2>Clinic</h2>
          <nav aria-label="Dashboard sections">
            <ul>
              <li><a href="#dashboard">Overview</a></li>
              <li><a href="#agents">Agents</a></li>
              <li><a href="#ailments">Ailments</a></li>
              <li><a href="#therapies">Therapies</a></li>
              <li><a href="#appointments">Appointments</a></li>
            </ul>
          </nav>
        </aside>

        <div className="dashboard-content">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Staff dashboard</p>
              <h2>Care coordination</h2>
            </div>
            <a className="button secondary-button small-button" href="#booking">
              Book an appointment
            </a>
          </div>

          <section className="workflow-section" id="agents" aria-labelledby="agents-heading">
            <div className="workflow-heading">
              <p className="eyebrow">Step 1</p>
              <h2 id="agents-heading">Select an agent</h2>
              <p>Choose an agent to review their profile and care needs.</p>
            </div>
            <div className="agent-grid">
              {agents.map((agent) => (
                <button
                  type="button"
                  key={agent.id}
                  className="agent-card"
                  aria-pressed={selectedAgentId === agent.id}
                  onClick={() => handleAgentSelect(agent)}
                >
                  <span className="agent-card-name">{agent.name}</span>
                  <span>{agent.role}</span>
                  <span className="agent-card-status">{agent.status}</span>
                </button>
              ))}
            </div>
          </section>

          {selectedAgent ? (
            <section className="workflow-section" id="ailments" aria-labelledby="profile-heading">
              <div className="workflow-heading">
                <p className="eyebrow">Step 2</p>
                <h2 id="profile-heading">Agent profile and ailments</h2>
                <p>Review the profile, then choose the ailment for this care plan.</p>
              </div>

              <div className="profile-grid">
                <article className="agent-profile-card">
                  <p className="eyebrow">Agent profile</p>
                  <h3>{selectedAgent.name}</h3>
                  <p className="agent-role">{selectedAgent.role}</p>
                  <p>{selectedAgent.summary}</p>
                  <span className="agent-status">{selectedAgent.status}</span>
                </article>

                <fieldset className="ailment-picker">
                  <legend>Ailments associated with {selectedAgent.name}</legend>
                  {selectedAgent.ailmentIds.map((ailmentId) => {
                    const ailment = ailments.find((item) => item.id === ailmentId)
                    if (!ailment) {
                      return null
                    }

                    return (
                      <label className="ailment-option" key={ailment.id}>
                        <input
                          type="radio"
                          name="selected-ailment"
                          value={ailment.id}
                          checked={selectedAilmentId === ailment.id}
                          onChange={() => {
                            setSelectedAilmentId(ailment.id)
                            resetBookingSelection()
                          }}
                        />
                        <span>
                          <strong>{ailment.name}</strong>
                          <small>{ailment.description}</small>
                        </span>
                      </label>
                    )
                  })}
                  {selectedAgent.ailmentIds.length === 0 && (
                    <p className="empty-state">No ailments are recorded for this agent.</p>
                  )}
                </fieldset>
              </div>
            </section>
          ) : (
            <p className="empty-state" role="status">No agents are available.</p>
          )}

          <TherapiesSection
            therapies={relatedTherapies}
            selectedTherapyId={selectedTherapyId}
            onSelectTherapy={(therapyId) => {
              setSelectedTherapyId(therapyId)
              setSelectedSlotId('')
              setBookingError('')
              setConfirmation('')
            }}
          />

          <section className="workflow-section booking-section" id="booking" aria-labelledby="booking-heading">
            <div className="workflow-heading">
              <p className="eyebrow">Step 4</p>
              <h2 id="booking-heading">Book an appointment</h2>
              <p>Choose an open time for the selected agent and therapy.</p>
            </div>

            {storageStatus === 'loading' && (
              <p className="status-message" role="status">Loading saved appointments…</p>
            )}
            {storageError && <p className="error-message" role="alert">{storageError}</p>}
            {bookingError && <p className="error-message" role="alert">{bookingError}</p>}
            {confirmation && <p className="success-message" role="status">{confirmation}</p>}

            {selectedAgent && selectedAilment && selectedTherapy ? (
              availableSlots.length > 0 ? (
                <form className="booking-form" onSubmit={handleBookingSubmit}>
                  <div className="booking-summary">
                    <span><strong>Agent</strong>{selectedAgent.name}</span>
                    <span><strong>Ailment</strong>{selectedAilment.name}</span>
                    <span><strong>Therapy</strong>{selectedTherapy.name}</span>
                  </div>
                  <label htmlFor="appointment-slot">Available appointment time</label>
                  <select
                    id="appointment-slot"
                    value={selectedSlotId}
                    onChange={(event) => {
                      setSelectedSlotId(event.target.value)
                      setBookingError('')
                      setConfirmation('')
                    }}
                    required
                    disabled={storageStatus !== 'ready'}
                  >
                    <option value="" disabled>Choose a time</option>
                    {availableSlots.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.date} at {slot.time}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="button primary-button"
                    disabled={storageStatus !== 'ready' || !selectedSlotId}
                  >
                    Confirm appointment
                  </button>
                </form>
              ) : (
                <p className="empty-state" role="status">
                  No appointment times are available. Check back later.
                </p>
              )
            ) : (
              <p className="empty-state" role="status">
                Select an agent, ailment, and related therapy to choose an appointment time.
              </p>
            )}
          </section>

          <section className="schedule-panel" id="appointments" aria-labelledby="appointments-heading">
            <div className="schedule-header">
              <div>
                <p className="eyebrow">Care schedule</p>
                <h2 id="appointments-heading">Booked appointments</h2>
              </div>
              <span>{scheduledAppointments.length} {scheduledAppointments.length === 1 ? 'booking' : 'bookings'}</span>
            </div>

            {scheduledAppointments.length > 0 ? (
              <ul className="appointment-list">
                {scheduledAppointments.map(({ booking, agent, ailment, therapy, slot }) => (
                  <li className="appointment-item" key={booking.id}>
                    <div>
                      <strong>{agent.name}</strong>
                      <span>{therapy.name} · {ailment.name}</span>
                    </div>
                    <time>{slot.date} · {slot.time}</time>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No appointments booked yet.</p>
            )}
          </section>
        </div>
      </section>
    </MainLayout>
  )
}

export default App
