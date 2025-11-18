// Página Principal (/principal)
// Aquí puedes programar lo que quieras
import FooterButtons from '../components/Footer';
import MapComponent from '../components/Mapa';

export default function Principal() {
  return (
    <div style={{ paddingBottom: '60px' }}>
      <MapComponent />
      <FooterButtons />
    </div>
  );
}
