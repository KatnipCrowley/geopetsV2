export type LocationCategory = 'restaurant' | 'park' | 'landmark' | 'other';

export interface Location {
  id?: string;
  name: string;
  description: string;
  category: LocationCategory;
  latitude: number;
  longitude: number;
  createdAt?: any;
}

export interface LatLng {
  lat: number;
  lng: number;
}
