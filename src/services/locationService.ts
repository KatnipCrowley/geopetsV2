import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import type { QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Location } from '../types/location';

const COLLECTION_NAME = 'locations';

// Agregar una nueva ubicación
export const addLocation = async (location: Omit<Location, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...location,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error al guardar ubicación:', error);
    throw error;
  }
};

// Suscribirse a cambios en las ubicaciones (tiempo real)
export const subscribeToLocations = (
  onUpdate: (locations: Location[]) => void,
  onError?: (error: Error) => void
) => {
  return onSnapshot(
    collection(db, COLLECTION_NAME),
    (snapshot: QuerySnapshot<DocumentData>) => {
      const locations: Location[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Location));
      onUpdate(locations);
    },
    (error) => {
      console.error('Error al cargar ubicaciones:', error);
      if (onError) onError(error as Error);
    }
  );
};

// Obtener nombre legible de categoría
export const getCategoryName = (category: string): string => {
  const categories: Record<string, string> = {
    'restaurant': 'Restaurante',
    'park': 'Parque',
    'landmark': 'Punto de interés',
    'other': 'Otro'
  };
  return categories[category] || 'Otro';
};
