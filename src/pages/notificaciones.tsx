// Página Notificaciones (/Notificaciones)
// Aquí puedes programar lo que quieras

import NotificacionesList from "../components/NotificacionesList";
import FooterButtons from "../components/Footer";
import HeaderTitle from "../components/header";

export default function Notificaciones() {
  return (
    <>
      <HeaderTitle title="Notificaciones" />
      <NotificacionesList />
      <FooterButtons />
    </>
  );
}
