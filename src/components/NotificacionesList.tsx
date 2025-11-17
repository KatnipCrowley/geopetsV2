import Notificacion from "./Notificacion";


const Notificaciones = [
    { name: 'Testing', date: 'Hace 1 dia', text: 'Esta es una notificación de prueba' },
    { name: 'Cristian Ghost', date: 'Hace 1 dia', text: 'Ha visto tu perfil' },
    { name: 'Admin', date: 'Hace 2 dias', text: 'Bienvenido a la plataforma' },
]

export default function NotificacionesList() {
  return (
    <div className="notif-list-container">
      {Notificaciones.map((notificacion) => (
        <Notificacion
          name={notificacion.name}
          date={notificacion.date}
          text={notificacion.text}
        />
      ))}
    </div>
  );
}