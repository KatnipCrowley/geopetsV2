import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Location, LatLng } from '../types/location';
import type { Map as LeafletMap } from 'leaflet';

interface MapContextType {
  selectedLatLng: LatLng | null;
  setSelectedLatLng: (latLng: LatLng | null) => void;
  locations: Location[];
  setLocations: (locations: Location[]) => void;
  map: LeafletMap | null;
  setMap: (map: LeafletMap | null) => void;
  focusLocation: (location: Location) => void;
  mapCenter: [number, number];
  setMapCenter: (center: [number, number]) => void;
  mapZoom: number;
  setMapZoom: (zoom: number) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [selectedLatLng, setSelectedLatLng] = useState<LatLng | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [map, setMap] = useState<LeafletMap | null>(null);
  // Estado persistente del mapa: coordenadas de Maipú por defecto
  const [mapCenter, setMapCenter] = useState<[number, number]>([-33.5110, -70.7580]);
  const [mapZoom, setMapZoom] = useState<number>(13);

  const focusLocation = (location: Location) => {
    if (map) {
      map.setView([location.latitude, location.longitude], 15);
    }
  };

  return (
    <MapContext.Provider
      value={{
        selectedLatLng,
        setSelectedLatLng,
        locations,
        setLocations,
        map,
        setMap,
        focusLocation,
        mapCenter,
        setMapCenter,
        mapZoom,
        setMapZoom,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}
