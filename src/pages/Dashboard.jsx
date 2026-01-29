import { Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'

export default function Dashboard() {
  const { bikes, getAllDueMaintenance, maintenanceLogs } = useApp()

  const dueMaintenance = getAllDueMaintenance()
  const recentLogs = maintenanceLogs
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Keep your bikes running smooth</p>
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
            <p>Add your first bike to start tracking maintenance</p>
            <Link to="/bikes" className="btn btn-primary mt-4">
              Add a Bike
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Due Maintenance */}
          <section className="mb-4">
            <h3 className="text-sm font-semibold text-muted mb-3">MAINTENANCE DUE</h3>

            {dueMaintenance.length === 0 ? (
              <div className="card">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '24px' }}>✓</span>
                  <div>
                    <p className="font-semibold">All caught up!</p>
                    <p className="text-sm text-muted">No maintenance due right now</p>
                  </div>
                </div>
              </div>
            ) : (
              dueMaintenance.slice(0, 3).map((item, i) => (
                <Link
                  key={i}
                  to={`/guides/${item.guide.id}`}
                  className="card card-clickable"
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {item.overdue && <span className="due-indicator overdue" />}
                        {item.upcoming && <span className="due-indicator" />}
                        <span className="font-semibold">{item.guide.title}</span>
                      </div>
                      <p className="text-sm text-muted">
                        {item.bike.name} • {Math.round(item.mileageSinceService)} mi since last service
                      </p>
                    </div>
                    <span className={`badge badge-${item.overdue ? 'danger' : 'warning'}`}>
                      {item.overdue ? 'Overdue' : 'Due Soon'}
                    </span>
                  </div>
                </Link>
              ))
            )}

            {dueMaintenance.length > 3 && (
              <Link to="/bikes" className="btn btn-outline btn-full mt-2">
                View All ({dueMaintenance.length})
              </Link>
            )}
          </section>

          {/* Quick Actions */}
          <section className="mb-4">
            <h3 className="text-sm font-semibold text-muted mb-3">QUICK ACTIONS</h3>
            <div className="flex gap-2">
              <Link to="/rides" className="btn btn-primary" style={{ flex: 1 }}>
                Log Ride
              </Link>
              <Link to="/guides" className="btn btn-secondary" style={{ flex: 1 }}>
                View Guides
              </Link>
            </div>
          </section>

          {/* Your Bikes */}
          <section className="mb-4">
            <h3 className="text-sm font-semibold text-muted mb-3">YOUR BIKES</h3>
            {bikes.map(bike => (
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
                      {bike.year} {bike.make} {bike.model}
                    </div>
                  </div>
                </div>
                <div className="bike-mileage">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span><strong>{bike.totalMileage || 0}</strong> miles</span>
                </div>
              </Link>
            ))}
          </section>

          {/* Recent Activity */}
          {recentLogs.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-muted mb-3">RECENT ACTIVITY</h3>
              <div className="card">
                {recentLogs.map(log => {
                  const bike = bikes.find(b => b.id === log.bikeId)
                  return (
                    <div key={log.id} className="list-item">
                      <div style={{ flex: 1 }}>
                        <p className="font-semibold">{log.taskName}</p>
                        <p className="text-sm text-muted">
                          {bike?.name} • {new Date(log.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
