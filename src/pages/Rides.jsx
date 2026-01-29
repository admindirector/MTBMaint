import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import Modal from '../components/common/Modal'

export default function Rides() {
  const { bikes, rides, addRide, getRidesForBike } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    bikeId: '',
    mileage: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  // Get all rides sorted by date
  const allRides = [...rides].sort((a, b) => new Date(b.date) - new Date(a.date))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.bikeId || !formData.mileage) return

    addRide({
      bikeId: formData.bikeId,
      mileage: parseFloat(formData.mileage),
      date: formData.date,
      notes: formData.notes
    })

    setFormData({
      bikeId: bikes.length === 1 ? bikes[0].id : '',
      mileage: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    })
    setShowForm(false)
  }

  const openForm = () => {
    setFormData({
      bikeId: bikes.length === 1 ? bikes[0].id : '',
      mileage: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    })
    setShowForm(true)
  }

  return (
    <div>
      <div className="page-header">
        <h2>Ride Log</h2>
        <p>Track your mileage</p>
      </div>

      {bikes.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h3" />
            </svg>
            <h3>Add a bike first</h3>
            <p>You need to add a bike before logging rides</p>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="flex gap-3 mb-4">
            {bikes.slice(0, 2).map(bike => (
              <div key={bike.id} className="card" style={{ flex: 1 }}>
                <p className="text-sm text-muted">{bike.name}</p>
                <p style={{ fontSize: '24px', fontWeight: 700 }}>{bike.totalMileage || 0}</p>
                <p className="text-sm text-muted">miles</p>
              </div>
            ))}
          </div>

          {/* Log Ride Button */}
          <button className="btn btn-primary btn-full mb-4" onClick={openForm}>
            Log a Ride
          </button>

          {/* Ride History */}
          <section>
            <h3 className="text-sm font-semibold text-muted mb-3">RIDE HISTORY</h3>

            {allRides.length === 0 ? (
              <div className="card">
                <p className="text-muted text-center">No rides logged yet</p>
              </div>
            ) : (
              <div className="card">
                {allRides.map(ride => {
                  const bike = bikes.find(b => b.id === ride.bikeId)
                  return (
                    <div key={ride.id} className="list-item">
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          background: 'var(--primary)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          marginRight: '12px',
                          flexShrink: 0
                        }}
                      >
                        {ride.mileage}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="font-semibold">{ride.mileage} miles</p>
                        <p className="text-sm text-muted">
                          {bike?.name || 'Unknown bike'} • {new Date(ride.date).toLocaleDateString()}
                        </p>
                        {ride.notes && (
                          <p className="text-sm mt-1">{ride.notes}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </>
      )}

      {/* Log Ride Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Log a Ride">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Bike</label>
            <select
              className="form-input"
              value={formData.bikeId}
              onChange={e => setFormData({ ...formData, bikeId: e.target.value })}
            >
              <option value="">Select a bike...</option>
              {bikes.map(bike => (
                <option key={bike.id} value={bike.id}>{bike.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Distance (miles)</label>
            <input
              type="number"
              step="0.1"
              className="form-input"
              placeholder="e.g., 15"
              value={formData.mileage}
              onChange={e => setFormData({ ...formData, mileage: e.target.value })}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="form-input"
              placeholder="e.g., Local trails, muddy conditions"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={!formData.bikeId || !formData.mileage}
            >
              Log Ride
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
