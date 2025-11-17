import LocationForm from './LocationForm';
import LocationsList from './LocationsList';
import Instructions from './Instructions';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Agregar Ubicación</h2>
      <LocationForm />
      <LocationsList />
      <Instructions />
    </div>
  );
}
