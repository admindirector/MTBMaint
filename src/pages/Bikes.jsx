import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import Modal from '../components/common/Modal'

export default function Bikes() {
  const { bikes, addBike, getDueMaintenance } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    addBike({
      name: formData.name.trim(),
      make: formData.make.trim(),
      model: formData.model.trim(),
      year: parseInt(formData.year) || new Date().getFullYear(),
      notes: formData.notes.trim()
    })

    setFormData({ name: '', make: '', model: '', year: new Date().getFullYear(), notes: '' })
    setShowForm(false)
  }

  return (
    <div>
      <div className="page-header">
        <h2>My Bikes</h2>
        <p>{bikes.length} bike{bikes.length !== 1 ? 's' : ''}</p>
      </div>

      {bikes.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h3" />
            </svg>
            <h3>No bikes yet</h3>
            <p>Add your first bike to start tracking</p>
          </div>
        </div>
      ) : (
        bikes.map(bike => {
          const dueMaintenance = getDueMaintenance(bike.id)
          const overdueCount = dueMaintenance.filter(d => d.overdue).length
          const dueCount = dueMaintenance.filter(d => !d.overdue).length

          return (
            <Link
              key={bike.id}
              to={`/bikes/${bike.id}`}
              className="card card-clickable bike-card"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              <div className="bike-card-header">
                <div>
                  <div className="bike-name">{bike.name}</div>
                  <div className="bike-info">
                    {[bike.year, bike.make, bike.model].filter(Boolean).join(' ')}
                  </div>
                </div>
                <div className="flex gap-2">
                  {overdueCount > 0 && (
                    <span className="badge badge-danger">{overdueCount} overdue</span>
                  )}
                  {dueCount > 0 && (
                    <span className="badge badge-warning">{dueCount} due</span>
                  )}
                </div>
              </div>
              <div className="bike-mileage">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span><strong>{bike.totalMileage || 0}</strong> miles</span>
                {bike.components?.length > 0 && (
                  <span style={{ marginLeft: 'auto' }}>
                    {bike.components.length} component{bike.components.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </Link>
          )
        })
      )}

      <button className="btn btn-primary btn-full mt-4" onClick={() => setShowForm(true)}>
        Add New Bike
      </button>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add New Bike">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Bike Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Trail Ripper"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Make</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Santa Cruz"
              value={formData.make}
              onChange={e => setFormData({ ...formData, make: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Model</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Bronson"
              value={formData.model}
              onChange={e => setFormData({ ...formData, model: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Year</label>
            <input
              type="number"
              className="form-input"
              placeholder="2024"
              value={formData.year}
              onChange={e => setFormData({ ...formData, year: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-input"
              placeholder="Any notes about this bike..."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Add Bike
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
