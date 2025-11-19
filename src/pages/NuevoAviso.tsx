import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMap } from '../context/MapContext';
import HeaderTitle from '../components/header';
import FooterButtons from '../components/Footer';
import '../components/NuevoAviso.css';

export default function NuevoAviso() {
  const navigate = useNavigate();
  const { selectedLatLng, setSelectedLatLng } = useMap();
  
  const [titulo, setTitulo] = useState('');
  const [tipoAviso, setTipoAviso] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLatLng) {
      alert('No se ha seleccionado una ubicación');
      return;
    }

    const nuevoAviso = {
      titulo,
      tipoAviso,
      ubicacion: selectedLatLng,
      fecha: new Date().toISOString(),
    };

    console.log('Nuevo aviso creado:', nuevoAviso);
    
    // Aquí puedes guardar el aviso en localStorage o Firebase
    const avisos = JSON.parse(localStorage.getItem('avisos') || '[]');
    avisos.unshift(nuevoAviso);
    localStorage.setItem('avisos', JSON.stringify(avisos));

    // Limpiar el estado y redirigir
    setSelectedLatLng(null);
    alert('Aviso creado exitosamente');
    navigate('/');
  };

  const handleCancel = () => {
    setSelectedLatLng(null);
    navigate('/');
  };

  return (
    <>
      <HeaderTitle title="Nuevo Aviso" />
      <div className="nuevo-aviso-container">
        <form onSubmit={handleSubmit} className="nuevo-aviso-form">
          <div className="aviso-form-group">
            <label htmlFor="titulo">Título del aviso</label>
            <input
              type="text"
              id="titulo"
              className="aviso-form-input"
              placeholder="Ej: Mascota perdida en el sector"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              maxLength={100}
            />
          </div>

          <div className="aviso-form-group">
            <label htmlFor="tipo-aviso">Tipo de aviso</label>
            <select
              id="tipo-aviso"
              className="aviso-form-select"
              value={tipoAviso}
              onChange={(e) => setTipoAviso(e.target.value)}
              required
            >
              <option value="">Selecciona un tipo</option>
              <option value="mascota-perdida">Mascota perdida</option>
              <option value="mascota-encontrada">Mascota encontrada</option>
              <option value="adopcion">En adopción</option>
              <option value="alerta">Alerta de seguridad</option>
              <option value="servicio">Servicio veterinario</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="aviso-form-group">
            <label>Ubicación seleccionada</label>
            <div className="aviso-location-display">
              {selectedLatLng ? (
                <>
                  <span className="aviso-location-icon">📍</span>
                  Lat: {selectedLatLng.lat.toFixed(4)}, Lng: {selectedLatLng.lng.toFixed(4)}
                </>
              ) : (
                <span style={{ color: '#999' }}>
                  No se ha seleccionado una ubicación
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: '#fff',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="aviso-submit-button"
              disabled={!titulo || !tipoAviso || !selectedLatLng}
              style={{ flex: 1, margin: 0 }}
            >
              Crear Aviso
            </button>
          </div>
        </form>
      </div>
      <FooterButtons />
    </>
  );
}