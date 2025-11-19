import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMap } from '../context/MapContext'
import type { Aviso } from '../types/aviso'

// Fix para los iconos de Leaflet en React
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Componente para capturar eventos del mapa y guardar el estado
function MapStateHandler() {
  const { setMapCenter, setMapZoom, setMap, setSelectedLatLng } = useMap();
  
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      setMapCenter([center.lat, center.lng]);
    },
    zoomend: () => {
      setMapZoom(map.getZoom());
    },
    click: (e) => {
      setSelectedLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  useEffect(() => {
    setMap(map);
  }, [map, setMap]);

  return null;
}

export default function MapComponent() {
  const { mapCenter, mapZoom, selectedLatLng } = useMap();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  
  // Coordenadas fijas del marcador inicial de Maipú
  const markerPosition: [number, number] = [-33.5110, -70.7580];

  // Cargar avisos del localStorage
  useEffect(() => {
    const cargarAvisos = () => {
      const avisosGuardados = localStorage.getItem('avisos');
      if (avisosGuardados) {
        setAvisos(JSON.parse(avisosGuardados));
      }
    };

    cargarAvisos();

    // Listener para actualizar cuando se creen nuevos avisos
    const handleAvisosUpdate = () => {
      cargarAvisos();
    };

    window.addEventListener('avisosUpdate', handleAvisosUpdate);
    
    return () => {
      window.removeEventListener('avisosUpdate', handleAvisosUpdate);
    };
  }, []);

  useEffect(() => {
    setShowButton(selectedLatLng !== null);
  }, [selectedLatLng]);

  const handleCreateNotice = () => {
    navigate('/nuevo-aviso');
  };

  const getTipoAvisoName = (tipo: string): string => {
    const tipos: Record<string, string> = {
      'mascota-perdida': 'Mascota perdida',
      'mascota-encontrada': 'Mascota encontrada',
      'adopcion': 'En adopción',
      'alerta': 'Alerta de seguridad',
      'servicio': 'Servicio veterinario',
      'otro': 'Otro'
    };
    return tipos[tipo] || 'Otro';
  };

  const getTipoAvisoIcon = (tipo: string): string => {
    const iconos: Record<string, string> = {
      'mascota-perdida': '🐾',
      'mascota-encontrada': '🏠',
      'adopcion': '❤️',
      'alerta': '⚠️',
      'servicio': '🏥',
      'otro': '📌'
    };
    return iconos[tipo] || '📌';
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 60px)' }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        whenReady={() => {
          console.log('Mapa listo');
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapStateHandler />
        <Marker position={markerPosition}>
          <Popup>
            Maipú, Región Metropolitana <br /> Chile
          </Popup>
        </Marker>
        
        {/* Marcadores de avisos creados */}
        {avisos.map((aviso) => (
          <Marker 
            key={aviso.id} 
            position={[aviso.ubicacion.lat, aviso.ubicacion.lng]}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
                  {getTipoAvisoIcon(aviso.tipoAviso)} {aviso.titulo}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {getTipoAvisoName(aviso.tipoAviso)}
                </div>
                <div style={{ fontSize: '11px', color: '#999' }}>
                  {new Date(aviso.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {selectedLatLng && (
          <Marker position={[selectedLatLng.lat, selectedLatLng.lng]}>
            <Popup>
              Zona seleccionada
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {showButton && (
        <button
          onClick={handleCreateNotice}
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)',
            zIndex: 1000,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0052a3';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0066cc';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
          }}
        >
          📍 Crear un aviso en esta zona
        </button>
      )}
    </div>
  );
}