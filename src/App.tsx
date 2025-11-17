import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Principal from './pages/Principal'
import Notificaciones from './pages/notificaciones'
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Principal />} />  
      <Route path='/principal' element={<Principal />} />  
      <Route path='/notificaciones' element={<Notificaciones />} />  
    </Routes>
    </BrowserRouter>
  )
}

export default App
