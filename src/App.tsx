import './App.css'
import './mapa.css'
import Header from './components/header'
import MapContainer from './components/MapContainer'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="container">
      <Header subtitle="" />

      <div className="app-container">
        <MapContainer />
        <Sidebar />
      </div>

      <Footer />
    </div>
  )
}

export default App
