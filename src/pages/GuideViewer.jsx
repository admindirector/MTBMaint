import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getGuide, categories } from '../data/guides'
import { useApp } from '../contexts/AppContext'
import Modal from '../components/common/Modal'

export default function GuideViewer() {
  const { guideId } = useParams()
  const navigate = useNavigate()
  const { bikes, addMaintenanceLog } = useApp()
  const guide = getGuide(guideId)

  const [stepMode, setStepMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [checkedTools, setCheckedTools] = useState({})
  const [showLogModal, setShowLogModal] = useState(false)
  const [selectedBike, setSelectedBike] = useState('')
  const [logNotes, setLogNotes] = useState('')

  if (!guide) {
    return (
      <div className="card">
        <div className="empty-state">
          <h3>Guide not found</h3>
          <Link to="/guides" className="btn btn-primary mt-4">Back to Guides</Link>
        </div>
      </div>
    )
  }

  const category = categories.find(c => c.id === guide.category)
  const steps = guide.steps || []

  const toggleTool = (tool) => {
    setCheckedTools(prev => ({ ...prev, [tool]: !prev[tool] }))
  }

  const handleLogMaintenance = () => {
    if (!selectedBike) return

    addMaintenanceLog({
      bikeId: selectedBike,
      guideId: guide.id,
      taskName: guide.title,
      category: guide.category,
      notes: logNotes
    })

    setShowLogModal(false)
    setLogNotes('')
    navigate(`/bikes/${selectedBike}`)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'difficulty-beginner'
      case 'intermediate': return 'difficulty-intermediate'
      case 'advanced': return 'difficulty-advanced'
      default: return ''
    }
  }

  // Step-by-step mode
  if (stepMode) {
    const step = steps[currentStep]
    const progress = ((currentStep + 1) / steps.length) * 100
    const isLastStep = currentStep === steps.length - 1

    return (
      <div className="step-viewer">
        <div className="step-header">
          <button
            onClick={() => setStepMode(false)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="step-progress">
            <div className="step-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <span style={{ fontSize: '14px', color: 'var(--gray-500)', minWidth: '50px', textAlign: 'right' }}>
            {currentStep + 1}/{steps.length}
          </span>
        </div>

        <div className="step-content">
          <h2>{step.title}</h2>
          <p>{step.description}</p>
        </div>

        <div className="step-footer">
          <button
            className="btn btn-outline"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          {isLastStep ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                setStepMode(false)
                if (bikes.length > 0) {
                  setShowLogModal(true)
                }
              }}
            >
              Done!
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setCurrentStep(prev => prev + 1)}
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    )
  }

  // Overview mode
  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <Link to="/guides" className="text-sm text-muted" style={{ textDecoration: 'none' }}>
          ← Back to Guides
        </Link>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '8px' }}>{guide.title}</h2>

        <div className="flex gap-2 mt-3">
          <span
            className="badge"
            style={{
              background: `${category?.color}20`,
              color: category?.color
            }}
          >
            {category?.name}
          </span>
          <span className={`badge ${getDifficultyColor(guide.difficulty)}`}>
            {guide.difficulty}
          </span>
          {guide.intervalMiles && (
            <span className="badge badge-secondary">
              Every {guide.intervalMiles} mi
            </span>
          )}
        </div>
      </div>

      {/* Start Button */}
      <button
        className="btn btn-primary btn-lg btn-full mb-4"
        onClick={() => {
          setCurrentStep(0)
          setStepMode(true)
        }}
      >
        Start Guide ({steps.length} steps)
      </button>

      {/* Video Link */}
      {guide.videoUrl && (
        <a
          href={guide.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card card-clickable mb-4"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              background: '#FF0000',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Watch Video Tutorial</p>
            <p className="text-sm text-muted">Opens in YouTube</p>
          </div>
        </a>
      )}

      {/* Tools Checklist */}
      {guide.tools && guide.tools.length > 0 && (
        <section className="mb-4">
          <h3 className="text-sm font-semibold text-muted mb-3">TOOLS NEEDED</h3>
          <div className="card">
            <ul className="tool-checklist">
              {guide.tools.map((tool, i) => (
                <li key={i} onClick={() => toggleTool(tool)}>
                  <div className={`tool-checkbox ${checkedTools[tool] ? 'checked' : ''}`}>
                    {checkedTools[tool] && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span style={{ textDecoration: checkedTools[tool] ? 'line-through' : 'none' }}>
                    {tool}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Steps Overview */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold text-muted mb-3">STEPS OVERVIEW</h3>
        <div className="card">
          {steps.map((step, i) => (
            <div key={i} className="list-item">
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--gray-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '14px',
                  marginRight: '12px',
                  flexShrink: 0
                }}
              >
                {i + 1}
              </div>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="text-sm text-muted" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Log Maintenance Button */}
      {bikes.length > 0 && (
        <button
          className="btn btn-secondary btn-full"
          onClick={() => setShowLogModal(true)}
        >
          Log This Maintenance
        </button>
      )}

      {/* Log Modal */}
      <Modal isOpen={showLogModal} onClose={() => setShowLogModal(false)} title="Log Maintenance">
        <p className="mb-4">Record that you completed <strong>{guide.title}</strong></p>

        <div className="form-group">
          <label className="form-label">Select Bike</label>
          <select
            className="form-input"
            value={selectedBike}
            onChange={e => setSelectedBike(e.target.value)}
          >
            <option value="">Choose a bike...</option>
            {bikes.map(bike => (
              <option key={bike.id} value={bike.id}>{bike.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Notes (optional)</label>
          <textarea
            className="form-input"
            placeholder="Any notes about this service..."
            value={logNotes}
            onChange={e => setLogNotes(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowLogModal(false)}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={handleLogMaintenance}
            disabled={!selectedBike}
          >
            Log It
          </button>
        </div>
      </Modal>
    </div>
  )
}
