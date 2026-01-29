import { Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import Dashboard from './pages/Dashboard'
import Bikes from './pages/Bikes'
import BikeDetail from './pages/BikeDetail'
import Guides from './pages/Guides'
import GuideViewer from './pages/GuideViewer'
import Rides from './pages/Rides'
import Settings from './pages/Settings'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/bikes/:bikeId" element={<BikeDetail />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/:guideId" element={<GuideViewer />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default App
