import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Notificaciones from './pages/notificaciones'
import Principal from './pages/Principal'
import Feed from './pages/feed';
import { MapProvider } from './context/MapContext';
import './App.css'

function App() {
  return (
    <MapProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Principal />} />  
          <Route path='/principal' element={<Principal />} />  
          <Route path='/feed' element={<Feed />} />
          <Route path='/notificaciones' element={<Notificaciones />} />  
        </Routes>
      </BrowserRouter>
    </MapProvider>
  )
}

export default App
