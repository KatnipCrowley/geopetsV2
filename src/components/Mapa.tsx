import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'
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
  const { setMapCenter, setMapZoom, setMap } = useMap();
  
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      setMapCenter([center.lat, center.lng]);
    },
    zoomend: () => {
      setMapZoom(map.getZoom());
    },
  });

  useEffect(() => {
    setMap(map);
  }, [map, setMap]);

  return null;
}

export default function MapComponent() {
  const { mapCenter, mapZoom } = useMap();
  // Coordenadas fijas del marcador inicial de Maipú
  const markerPosition: [number, number] = [-33.5110, -70.7580];

  useEffect(() => {
    // Limpieza al desmontar el componente
    return () => {
      // Cualquier limpieza necesaria
    };
  }, []);

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 60px)' }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        // Prevenir re-renderizado innecesario
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
      </MapContainer>
    </div>
  );
}
