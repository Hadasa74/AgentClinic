import './TherapiesSection.css'

type Therapy = {
  id: string
  name: string
  description: string
  ailments: string[]
}

const availableTherapies: Therapy[] = [
  {
    id: 'memory-support',
    name: 'Memory Support Coaching',
    description: 'Structured check-ins to support recall during daily routines.',
    ailments: ['Memory drift'],
  },
  {
    id: 'energy-pacing',
    name: 'Energy Pacing',
    description: 'A balanced activity plan with regular opportunities to recharge.',
    ailments: ['Low energy'],
  },
  {
    id: 'routine-reset',
    name: 'Routine Reorientation',
    description: 'Guided prompts to make familiar routines easier to follow.',
    ailments: ['Routine check-in', 'Memory drift'],
  },
]

type TherapiesSectionProps = {
  therapies?: readonly Therapy[]
}

function TherapiesSection({ therapies = availableTherapies }: TherapiesSectionProps) {
  return (
    <section className="therapies-section" id="therapies" aria-labelledby="therapies-heading">
      <div className="section-heading therapies-heading">
        <div>
          <p className="eyebrow">Care options</p>
          <h2 id="therapies-heading">Available therapies</h2>
        </div>
        <p className="therapy-count">
          {therapies.length === 1 ? '1 therapy' : `${therapies.length} therapies`}
        </p>
      </div>

      {therapies.length > 0 ? (
        <div className="therapy-grid">
          {therapies.map((therapy) => (
            <article
              key={therapy.id}
              className="therapy-card"
              aria-labelledby={`therapy-${therapy.id}`}
            >
              <h3 id={`therapy-${therapy.id}`}>{therapy.name}</h3>
              <p>{therapy.description}</p>
              <div className="therapy-ailments">
                <h4>Related ailments</h4>
                <ul aria-label={`Ailments related to ${therapy.name}`}>
                  {therapy.ailments.map((ailment) => (
                    <li key={ailment}>{ailment}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="therapy-empty-state" role="status">
          No therapies are available right now.
        </p>
      )}
    </section>
  )
}

export default TherapiesSection
