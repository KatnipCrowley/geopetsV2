import { useState } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { mockLocations } from '../data/mockData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet en React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void;
}

function MapClickHandler({ onMapClick }: ClickHandlerProps) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapContainer() {
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
    
    // Actualizar el campo de coordenadas en el formulario
    const coordsElement = document.getElementById('coordinates');
    if (coordsElement) {
      coordsElement.textContent = `Latitud: ${lat.toFixed(4)}, Longitud: ${lng.toFixed(4)}`;
    }
  };

  return (
    <div className="map-container">
      <LeafletMapContainer
        center={[19.4326, -99.1332]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler onMapClick={handleMapClick} />
        
        {/* Marcadores de ubicaciones guardadas */}
        {mockLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              <strong>{location.name}</strong>
              <br />
              {location.description}
            </Popup>
          </Marker>
        ))}
        
        {/* Marcador temporal de la ubicación seleccionada */}
        {selectedPosition && (
          <Marker position={selectedPosition}>
            <Popup>Nueva ubicación seleccionada</Popup>
          </Marker>
        )}
      </LeafletMapContainer>
    </div>
  );
}
