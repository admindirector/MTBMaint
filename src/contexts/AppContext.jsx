import { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { maintenanceGuides } from '../data/guides'

const AppContext = createContext()

const STORAGE_KEY = 'mtbmaint_data'

const defaultData = {
  bikes: [],
  maintenanceLogs: [],
  rides: [],
  pdfResources: []
}

export function AppProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : defaultData
    } catch {
      return defaultData
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  // Bike operations
  const addBike = (bike) => {
    const newBike = {
      id: uuidv4(),
      totalMileage: 0,
      components: [],
      createdAt: new Date().toISOString(),
      ...bike
    }
    setData(prev => ({ ...prev, bikes: [...prev.bikes, newBike] }))
    return newBike
  }

  const updateBike = (bikeId, updates) => {
    setData(prev => ({
      ...prev,
      bikes: prev.bikes.map(b => b.id === bikeId ? { ...b, ...updates } : b)
    }))
  }

  const deleteBike = (bikeId) => {
    setData(prev => ({
      ...prev,
      bikes: prev.bikes.filter(b => b.id !== bikeId),
      maintenanceLogs: prev.maintenanceLogs.filter(l => l.bikeId !== bikeId),
      rides: prev.rides.filter(r => r.bikeId !== bikeId)
    }))
  }

  const getBike = (bikeId) => data.bikes.find(b => b.id === bikeId)

  // Component operations
  const addComponent = (bikeId, component) => {
    const newComponent = {
      id: uuidv4(),
      installedDate: new Date().toISOString().split('T')[0],
      installedMileage: getBike(bikeId)?.totalMileage || 0,
      ...component
    }
    setData(prev => ({
      ...prev,
      bikes: prev.bikes.map(b =>
        b.id === bikeId
          ? { ...b, components: [...b.components, newComponent] }
          : b
      )
    }))
  }

  const updateComponent = (bikeId, componentId, updates) => {
    setData(prev => ({
      ...prev,
      bikes: prev.bikes.map(b =>
        b.id === bikeId
          ? { ...b, components: b.components.map(c => c.id === componentId ? { ...c, ...updates } : c) }
          : b
      )
    }))
  }

  const deleteComponent = (bikeId, componentId) => {
    setData(prev => ({
      ...prev,
      bikes: prev.bikes.map(b =>
        b.id === bikeId
          ? { ...b, components: b.components.filter(c => c.id !== componentId) }
          : b
      )
    }))
  }

  // Maintenance log operations
  const addMaintenanceLog = (log) => {
    const bike = getBike(log.bikeId)
    const newLog = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      mileageAtService: bike?.totalMileage || 0,
      ...log
    }
    setData(prev => ({ ...prev, maintenanceLogs: [...prev.maintenanceLogs, newLog] }))
    return newLog
  }

  const getLogsForBike = (bikeId) =>
    data.maintenanceLogs
      .filter(l => l.bikeId === bikeId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))

  const getLastServiceForTask = (bikeId, guideId) => {
    const logs = data.maintenanceLogs.filter(
      l => l.bikeId === bikeId && l.guideId === guideId
    )
    return logs.sort((a, b) => new Date(b.date) - new Date(a.date))[0]
  }

  // Ride operations
  const addRide = (ride) => {
    const newRide = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      ...ride
    }

    // Update bike mileage
    const bike = getBike(ride.bikeId)
    if (bike) {
      updateBike(ride.bikeId, {
        totalMileage: (bike.totalMileage || 0) + (ride.mileage || 0)
      })
    }

    setData(prev => ({ ...prev, rides: [...prev.rides, newRide] }))
    return newRide
  }

  const getRidesForBike = (bikeId) =>
    data.rides
      .filter(r => r.bikeId === bikeId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))

  // Due maintenance calculations
  const getDueMaintenance = (bikeId) => {
    const bike = getBike(bikeId)
    if (!bike) return []

    const due = []

    maintenanceGuides.forEach(guide => {
      if (!guide.intervalMiles) return

      const lastService = getLastServiceForTask(bikeId, guide.id)
      const mileageSinceService = lastService
        ? bike.totalMileage - lastService.mileageAtService
        : bike.totalMileage

      if (mileageSinceService >= guide.intervalMiles) {
        due.push({
          guide,
          mileageSinceService,
          overdue: mileageSinceService > guide.intervalMiles * 1.2,
          lastService
        })
      } else if (mileageSinceService >= guide.intervalMiles * 0.8) {
        due.push({
          guide,
          mileageSinceService,
          upcoming: true,
          lastService
        })
      }
    })

    return due.sort((a, b) => (b.overdue ? 1 : 0) - (a.overdue ? 1 : 0))
  }

  const getAllDueMaintenance = () => {
    return data.bikes.flatMap(bike =>
      getDueMaintenance(bike.id).map(item => ({ ...item, bike }))
    )
  }

  // Export/Import
  const exportData = () => {
    return JSON.stringify(data, null, 2)
  }

  const importData = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString)
      if (imported.bikes && imported.maintenanceLogs && imported.rides) {
        setData(imported)
        return { success: true }
      }
      return { success: false, error: 'Invalid data format' }
    } catch (e) {
      return { success: false, error: 'Could not read file' }
    }
  }

  const clearAllData = () => {
    setData(defaultData)
  }

  const value = {
    bikes: data.bikes,
    maintenanceLogs: data.maintenanceLogs,
    rides: data.rides,
    addBike,
    updateBike,
    deleteBike,
    getBike,
    addComponent,
    updateComponent,
    deleteComponent,
    addMaintenanceLog,
    getLogsForBike,
    getLastServiceForTask,
    addRide,
    getRidesForBike,
    getDueMaintenance,
    getAllDueMaintenance,
    exportData,
    importData,
    clearAllData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
