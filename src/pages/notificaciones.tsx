// Página Notificaciones (/Notificaciones)
// Aquí puedes programar lo que quieras

import NotificacionesHeader from "../components/NotificacionesHeader";
import NotificacionesList from "../components/NotificacionesList";
import FooterButtons from "../components/Footer";

export default function Notificaciones() {
  return (
    <>
      <NotificacionesHeader />
      <NotificacionesList />
      <FooterButtons />
    </>
  );
}
