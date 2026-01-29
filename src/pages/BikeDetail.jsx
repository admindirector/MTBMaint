import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { maintenanceGuides, categories } from '../data/guides'
import Modal from '../components/common/Modal'

export default function BikeDetail() {
  const { bikeId } = useParams()
  const navigate = useNavigate()
  const {
    getBike,
    updateBike,
    deleteBike,
    addComponent,
    deleteComponent,
    addMaintenanceLog,
    getLogsForBike,
    getDueMaintenance
  } = useApp()

  const bike = getBike(bikeId)
  const logs = bike ? getLogsForBike(bikeId) : []
  const dueMaintenance = bike ? getDueMaintenance(bikeId) : []

  const [showEditBike, setShowEditBike] = useState(false)
  const [showAddComponent, setShowAddComponent] = useState(false)
  const [showLogMaintenance, setShowLogMaintenance] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [componentForm, setComponentForm] = useState({ name: '', type: 'drivetrain', notes: '' })
  const [logForm, setLogForm] = useState({ guideId: '', notes: '' })

  if (!bike) {
    return (
      <div className="card">
        <div className="empty-state">
          <h3>Bike not found</h3>
          <Link to="/bikes" className="btn btn-primary mt-4">Back to Bikes</Link>
        </div>
      </div>
    )
  }

  const handleEditBike = (e) => {
    e.preventDefault()
    updateBike(bikeId, editForm)
    setShowEditBike(false)
  }

  const handleDeleteBike = () => {
    deleteBike(bikeId)
    navigate('/bikes')
  }

  const handleAddComponent = (e) => {
    e.preventDefault()
    if (!componentForm.name.trim()) return
    addComponent(bikeId, componentForm)
    setComponentForm({ name: '', type: 'drivetrain', notes: '' })
    setShowAddComponent(false)
  }

  const handleLogMaintenance = (e) => {
    e.preventDefault()
    const guide = maintenanceGuides.find(g => g.id === logForm.guideId)
    if (!guide) return

    addMaintenanceLog({
      bikeId,
      guideId: guide.id,
      taskName: guide.title,
      category: guide.category,
      notes: logForm.notes
    })
    setLogForm({ guideId: '', notes: '' })
    setShowLogMaintenance(false)
  }

  const openEditModal = () => {
    setEditForm({
      name: bike.name,
      make: bike.make || '',
      model: bike.model || '',
      year: bike.year || '',
      totalMileage: bike.totalMileage || 0,
      notes: bike.notes || ''
    })
    setShowEditBike(true)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>{bike.name}</h2>
          <p className="text-muted">
            {[bike.year, bike.make, bike.model].filter(Boolean).join(' ') || 'No details'}
          </p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={openEditModal}>
          Edit
        </button>
      </div>

      {/* Stats */}
      <div className="card mb-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted">Total Mileage</p>
            <p style={{ fontSize: '28px', fontWeight: 700 }}>{bike.totalMileage || 0} mi</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="text-sm text-muted">Components</p>
            <p style={{ fontSize: '28px', fontWeight: 700 }}>{bike.components?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Due Maintenance */}
      {dueMaintenance.length > 0 && (
        <section className="mb-4">
          <h3 className="text-sm font-semibold text-muted mb-3">MAINTENANCE DUE</h3>
          {dueMaintenance.map((item, i) => (
            <Link
              key={i}
              to={`/guides/${item.guide.id}`}
              className="card card-clickable"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    {(item.overdue || item.upcoming) && (
                      <span className={`due-indicator ${item.overdue ? 'overdue' : ''}`} />
                    )}
                    <span className="font-semibold">{item.guide.title}</span>
                  </div>
                  <p className="text-sm text-muted mt-1">
                    {Math.round(item.mileageSinceService)} mi since last service
                    {item.guide.intervalMiles && ` (due every ${item.guide.intervalMiles} mi)`}
                  </p>
                </div>
                <span className={`badge badge-${item.overdue ? 'danger' : 'warning'}`}>
                  {item.overdue ? 'Overdue' : 'Due Soon'}
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2 mb-4">
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowLogMaintenance(true)}>
          Log Maintenance
        </button>
        <Link to="/rides" className="btn btn-secondary" style={{ flex: 1 }}>
          Log Ride
        </Link>
      </div>

      {/* Components */}
      <section className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-muted">COMPONENTS</h3>
          <button className="btn btn-outline btn-sm" onClick={() => setShowAddComponent(true)}>
            Add
          </button>
        </div>

        {(!bike.components || bike.components.length === 0) ? (
          <div className="card">
            <p className="text-muted text-center">No components added yet</p>
          </div>
        ) : (
          <div className="card">
            {bike.components.map((comp, i) => {
              const category = categories.find(c => c.id === comp.type)
              return (
                <div key={comp.id} className={`list-item ${i === 0 ? '' : ''}`}>
                  <div style={{ flex: 1 }}>
                    <p className="font-semibold">{comp.name}</p>
                    <p className="text-sm text-muted">
                      {category?.name || comp.type}
                      {comp.installedDate && ` • Installed ${new Date(comp.installedDate).toLocaleDateString()}`}
                    </p>
                  </div>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ padding: '8px' }}
                    onClick={() => deleteComponent(bikeId, comp.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Maintenance History */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold text-muted mb-3">MAINTENANCE HISTORY</h3>
        {logs.length === 0 ? (
          <div className="card">
            <p className="text-muted text-center">No maintenance logged yet</p>
          </div>
        ) : (
          <div className="card">
            {logs.slice(0, 10).map((log, i) => (
              <div key={log.id} className="list-item">
                <div style={{ flex: 1 }}>
                  <p className="font-semibold">{log.taskName}</p>
                  <p className="text-sm text-muted">
                    {new Date(log.date).toLocaleDateString()}
                    {log.mileageAtService > 0 && ` • ${log.mileageAtService} mi`}
                  </p>
                  {log.notes && <p className="text-sm mt-1">{log.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Notes */}
      {bike.notes && (
        <section className="mb-4">
          <h3 className="text-sm font-semibold text-muted mb-3">NOTES</h3>
          <div className="card">
            <p>{bike.notes}</p>
          </div>
        </section>
      )}

      {/* Delete */}
      <button
        className="btn btn-outline btn-full"
        style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
        onClick={() => setShowDeleteConfirm(true)}
      >
        Delete Bike
      </button>

      {/* Edit Bike Modal */}
      <Modal isOpen={showEditBike} onClose={() => setShowEditBike(false)} title="Edit Bike">
        <form onSubmit={handleEditBike}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              value={editForm.name || ''}
              onChange={e => setEditForm({ ...editForm, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Make</label>
            <input
              type="text"
              className="form-input"
              value={editForm.make || ''}
              onChange={e => setEditForm({ ...editForm, make: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Model</label>
            <input
              type="text"
              className="form-input"
              value={editForm.model || ''}
              onChange={e => setEditForm({ ...editForm, model: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Year</label>
            <input
              type="number"
              className="form-input"
              value={editForm.year || ''}
              onChange={e => setEditForm({ ...editForm, year: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Total Mileage</label>
            <input
              type="number"
              className="form-input"
              value={editForm.totalMileage || 0}
              onChange={e => setEditForm({ ...editForm, totalMileage: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-input"
              value={editForm.notes || ''}
              onChange={e => setEditForm({ ...editForm, notes: e.target.value })}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowEditBike(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Component Modal */}
      <Modal isOpen={showAddComponent} onClose={() => setShowAddComponent(false)} title="Add Component">
        <form onSubmit={handleAddComponent}>
          <div className="form-group">
            <label className="form-label">Component Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., SRAM GX Eagle Derailleur"
              value={componentForm.name}
              onChange={e => setComponentForm({ ...componentForm, name: e.target.value })}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input"
              value={componentForm.type}
              onChange={e => setComponentForm({ ...componentForm, type: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-input"
              placeholder="Any notes..."
              value={componentForm.notes}
              onChange={e => setComponentForm({ ...componentForm, notes: e.target.value })}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAddComponent(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Add
            </button>
          </div>
        </form>
      </Modal>

      {/* Log Maintenance Modal */}
      <Modal isOpen={showLogMaintenance} onClose={() => setShowLogMaintenance(false)} title="Log Maintenance">
        <form onSubmit={handleLogMaintenance}>
          <div className="form-group">
            <label className="form-label">Task</label>
            <select
              className="form-input"
              value={logForm.guideId}
              onChange={e => setLogForm({ ...logForm, guideId: e.target.value })}
            >
              <option value="">Select a task...</option>
              {categories.map(cat => (
                <optgroup key={cat.id} label={cat.name}>
                  {maintenanceGuides
                    .filter(g => g.category === cat.id)
                    .map(g => (
                      <option key={g.id} value={g.id}>{g.title}</option>
                    ))
                  }
                </optgroup>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="form-input"
              placeholder="Any notes about this service..."
              value={logForm.notes}
              onChange={e => setLogForm({ ...logForm, notes: e.target.value })}
            />
          </div>
          <p className="text-sm text-muted mb-4">
            This will log the task at the current mileage ({bike.totalMileage || 0} mi)
          </p>
          <div className="flex gap-3">
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowLogMaintenance(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={!logForm.guideId}>
              Log Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Delete Bike?">
        <p className="mb-4">
          Are you sure you want to delete <strong>{bike.name}</strong>? This will also delete all maintenance logs and ride history for this bike.
        </p>
        <div className="flex gap-3">
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" style={{ flex: 1 }} onClick={handleDeleteBike}>
            Delete
          </button>
        </div>
      </Modal>
    </div>
  )
}
