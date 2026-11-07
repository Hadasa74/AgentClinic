import './TherapiesSection.css'
import { ailments, type Therapy } from './clinicData'

type TherapiesSectionProps = {
  therapies?: readonly Therapy[]
  selectedTherapyId: string
  onSelectTherapy: (therapyId: string) => void
}

function TherapiesSection({
  therapies = [],
  selectedTherapyId,
  onSelectTherapy,
}: TherapiesSectionProps) {
  return (
    <section className="therapies-section" id="therapies" aria-labelledby="therapies-heading">
      <div className="section-heading therapies-heading">
        <div>
          <p className="eyebrow">Step 3 · Therapy matches</p>
          <h2 id="therapies-heading">Available therapies</h2>
        </div>
        <p className="therapy-context">For the selected ailment</p>
      </div>

      {therapies.length > 0 ? (
        <div className="therapy-grid">
          {therapies.map((therapy) => (
            <article
              key={therapy.id}
              className="therapy-card"
              aria-labelledby={`therapy-${therapy.id}`}
              data-selected={selectedTherapyId === therapy.id}
            >
              <h3 id={`therapy-${therapy.id}`}>{therapy.name}</h3>
              <p>{therapy.description}</p>
              <div className="therapy-ailments">
                <h4>Related ailments</h4>
                <ul aria-label={`Ailments related to ${therapy.name}`}>
                  {therapy.ailmentIds.map((ailmentId) => {
                    const ailment = ailments.find((item) => item.id === ailmentId)
                    return <li key={ailmentId}>{ailment?.name ?? ailmentId}</li>
                  })}
                </ul>
              </div>
              <button
                type="button"
                className={`button small-button ${selectedTherapyId === therapy.id ? 'primary-button' : 'secondary-button'}`}
                aria-pressed={selectedTherapyId === therapy.id}
                onClick={() => onSelectTherapy(therapy.id)}
              >
                {selectedTherapyId === therapy.id ? 'Selected' : 'Choose therapy'}
              </button>
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
