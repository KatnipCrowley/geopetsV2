import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMap } from '../context/MapContext'

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
  
  // Coordenadas fijas del marcador inicial de Maipú
  const markerPosition: [number, number] = [-33.5110, -70.7580];

  useEffect(() => {
    setShowButton(selectedLatLng !== null);
  }, [selectedLatLng]);

  const handleCreateNotice = () => {
    navigate('/nuevo-aviso');
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