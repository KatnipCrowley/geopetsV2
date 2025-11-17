export type LocationCategory = 'restaurant' | 'park' | 'landmark' | 'other';

export interface Location {
  id: string;
  name: string;
  description: string;
  category: LocationCategory;
  latitude: number;
  longitude: number;
}

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Restaurante El Buen Sabor',
    description: 'Comida mexicana tradicional',
    category: 'restaurant',
    latitude: 19.4326,
    longitude: -99.1332
  },
  {
    id: '2',
    name: 'Parque Chapultepec',
    description: 'Gran parque urbano con lagos y museos',
    category: 'park',
    latitude: 19.4195,
    longitude: -99.1820
  },
  {
    id: '3',
    name: 'Ángel de la Independencia',
    description: 'Monumento histórico icónico',
    category: 'landmark',
    latitude: 19.4270,
    longitude: -99.1677
  },
  {
    id: '4',
    name: 'Café La Estrella',
    description: 'Cafetería con ambiente acogedor',
    category: 'other',
    latitude: 19.4350,
    longitude: -99.1400
  }
];

export const getCategoryName = (category: LocationCategory): string => {
  const categories: Record<LocationCategory, string> = {
    'restaurant': 'Restaurante',
    'park': 'Parque',
    'landmark': 'Punto de interés',
    'other': 'Otro'
  };
  return categories[category];
};

export const getCategoryClass = (category: LocationCategory): string => {
  return `category-${category}`;
};
