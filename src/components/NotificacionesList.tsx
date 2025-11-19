import { useState, useEffect } from "react";
import Notificacion from "./Notificacion";

interface NotificacionData {
  id: string;
  name: string;
  date: string;
  text: string;
  avatar?: string;
  readed?: boolean;
}

const notificacionesPorDefecto: NotificacionData[] = [
  { id: '1', name: 'Testing', date: 'Hace 1 dia', text: 'Esta es una notificación de prueba', readed: true },
  { id: '2', name: 'Cristian Ghost', date: 'Hace 1 dia', text: 'Ha visto tu perfil', readed: true },
  { id: '3', name: 'Admin', date: 'Hace 2 dias', text: 'Bienvenido a la plataforma', readed: true },
];

export default function NotificacionesList() {
  const [notificaciones, setNotificaciones] = useState<NotificacionData[]>([]);

  useEffect(() => {
    const loadNotifications = () => {
      const storedNotifications = localStorage.getItem('notificaciones');
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        setNotificaciones([...parsedNotifications, ...notificacionesPorDefecto]);
      } else {
        setNotificaciones(notificacionesPorDefecto);
      }
    };

    loadNotifications();

    const handleNotificacionesUpdate = () => {
      loadNotifications();
    };

    window.addEventListener('notificacionesUpdate', handleNotificacionesUpdate);
    window.addEventListener('storage', handleNotificacionesUpdate);

    return () => {
      window.removeEventListener('notificacionesUpdate', handleNotificacionesUpdate);
      window.removeEventListener('storage', handleNotificacionesUpdate);
    };
  }, []);

  return (
    <div className="notif-list-container">
      {notificaciones.map((notificacion) => (
        <Notificacion
          key={notificacion.id}
          name={notificacion.name}
          date={notificacion.date}
          text={notificacion.text}
          avatar={notificacion.avatar}
          readed={notificacion.readed}
        />
      ))}
    </div>
  );
}