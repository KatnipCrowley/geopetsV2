import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
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

interface MapClickHandlerProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

function MapClickHandler({ onLocationSelect }: MapClickHandlerProps) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapaPickerProps {
  selectedLocation: [number, number] | null;
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function MapaPicker({ selectedLocation, onLocationSelect }: MapaPickerProps) {
  // Centro por defecto (Maipú, Chile)
  const defaultCenter: [number, number] = [-33.5110, -70.7580];

  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
      <MapContainer
        center={selectedLocation || defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onLocationSelect={onLocationSelect} />
        
        {selectedLocation && (
          <Marker position={selectedLocation} />
        )}
      </MapContainer>
    </div>
  );
}
