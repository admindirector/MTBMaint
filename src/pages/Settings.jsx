import { useState, useRef } from 'react'
import { useApp } from '../contexts/AppContext'
import Modal from '../components/common/Modal'

export default function Settings() {
  const { bikes, maintenanceLogs, rides, exportData, importData, clearAllData } = useApp()
  const fileInputRef = useRef(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [importStatus, setImportStatus] = useState(null)

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mtbmaint-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = importData(event.target.result)
      if (result.success) {
        setImportStatus({ type: 'success', message: 'Data imported successfully!' })
      } else {
        setImportStatus({ type: 'error', message: result.error })
      }
      setTimeout(() => setImportStatus(null), 3000)
    }
    reader.readAsText(file)

    // Reset input so same file can be selected again
    e.target.value = ''
  }

  const handleClearData = () => {
    clearAllData()
    setShowClearConfirm(false)
  }

  return (
    <div>
      <div className="page-header">
        <h2>Settings</h2>
        <p>Backup and manage your data</p>
      </div>

      {/* Data Summary */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold text-muted mb-3">YOUR DATA</h3>
        <div className="card">
          <div className="flex justify-between mb-3">
            <span className="text-muted">Bikes</span>
            <span className="font-semibold">{bikes.length}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-muted">Maintenance Logs</span>
            <span className="font-semibold">{maintenanceLogs.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Rides</span>
            <span className="font-semibold">{rides.length}</span>
          </div>
        </div>
      </section>

      {/* Backup & Restore */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold text-muted mb-3">BACKUP & RESTORE</h3>

        <div className="card mb-3">
          <h4 className="font-semibold mb-2">Export Data</h4>
          <p className="text-sm text-muted mb-3">
            Download all your data as a backup file. Keep this safe!
          </p>
          <button className="btn btn-primary btn-full" onClick={handleExport}>
            Export Backup
          </button>
        </div>

        <div className="card">
          <h4 className="font-semibold mb-2">Import Data</h4>
          <p className="text-sm text-muted mb-3">
            Restore from a backup file. This will replace all current data.
          </p>
          <button className="btn btn-secondary btn-full" onClick={handleImportClick}>
            Import Backup
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />

          {importStatus && (
            <div className={`alert alert-${importStatus.type === 'success' ? 'info' : 'danger'} mt-3`}>
              {importStatus.message}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold text-muted mb-3">ABOUT</h3>
        <div className="card">
          <h4 className="font-semibold mb-2">MTBMaint</h4>
          <p className="text-sm text-muted mb-2">
            Version 1.0.0
          </p>
          <p className="text-sm text-muted">
            A Progressive Web App for tracking mountain bike maintenance.
            Your data is stored locally on this device.
          </p>
        </div>
      </section>

      {/* Storage Info */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold text-muted mb-3">STORAGE</h3>
        <div className="card">
          <p className="text-sm text-muted mb-3">
            All data is stored in your browser's local storage. Clear your browser data
            and you'll lose everything - make sure to export backups regularly!
          </p>
          <div className="alert alert-warning">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="text-sm">Export your data before clearing browser storage</span>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h3 className="text-sm font-semibold text-muted mb-3">DANGER ZONE</h3>
        <div className="card" style={{ borderColor: 'var(--danger)', borderWidth: '1px', borderStyle: 'solid' }}>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--danger)' }}>Clear All Data</h4>
          <p className="text-sm text-muted mb-3">
            Permanently delete all bikes, maintenance logs, and rides. This cannot be undone.
          </p>
          <button
            className="btn btn-full"
            style={{ background: 'var(--danger)', color: 'white' }}
            onClick={() => setShowClearConfirm(true)}
          >
            Clear All Data
          </button>
        </div>
      </section>

      {/* Clear Confirmation Modal */}
      <Modal isOpen={showClearConfirm} onClose={() => setShowClearConfirm(false)} title="Clear All Data?">
        <div className="alert alert-danger mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>This will permanently delete all your data!</span>
        </div>

        <p className="mb-4">
          You're about to delete:
        </p>
        <ul style={{ listStyle: 'disc', marginLeft: '20px', marginBottom: '16px' }}>
          <li>{bikes.length} bike{bikes.length !== 1 ? 's' : ''}</li>
          <li>{maintenanceLogs.length} maintenance log{maintenanceLogs.length !== 1 ? 's' : ''}</li>
          <li>{rides.length} ride{rides.length !== 1 ? 's' : ''}</li>
        </ul>

        <div className="flex gap-3">
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowClearConfirm(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" style={{ flex: 1 }} onClick={handleClearData}>
            Delete Everything
          </button>
        </div>
      </Modal>
    </div>
  )
}
