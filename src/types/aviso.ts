export interface Aviso {
  id?: string;
  titulo: string;
  tipoAviso: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
  fecha: string;
}
