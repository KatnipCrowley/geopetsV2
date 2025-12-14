import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notificaciones from './pages/Notificaciones'
import Mapa from './pages/Mapa'
import PantallaInicio from './pages/PantallaInicio'
import Feed from './pages/Feed';
import NuevaPublicacion from './pages/NuevaPublicacion';
import NuevoAviso from './pages/NuevoAviso';
import { MapProvider } from './context/MapContext';
import ToastNotification from './components/ToastNotification';
import './App.css'

function App() {
  return (
    <MapProvider>
      <BrowserRouter>
        <ToastNotification />
        <Routes>
          <Route path='/' element={<PantallaInicio />} />
          <Route path='/principal' element={<Feed />} />
          <Route path='/mapa' element={<Mapa />} />
          <Route path='/notificaciones' element={<Notificaciones />} />
          <Route path='/nueva-publicacion' element={<NuevaPublicacion />} />
          <Route path='/nuevo-aviso' element={<NuevoAviso />} />
        </Routes>
      </BrowserRouter>
    </MapProvider>
  )
}

export default App