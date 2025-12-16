import { useState, useEffect } from "react";
import Notificacion from "./Notificacion";
import type { NotificacionData } from "../mockup";
import { mockNotificaciones } from "../mockup";



export default function NotificacionesList() {
  const [notificaciones, setNotificaciones] = useState<NotificacionData[]>([]);

  useEffect(() => {
    const loadNotifications = () => {
      const storedNotifications = localStorage.getItem('notificaciones');
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        setNotificaciones([...parsedNotifications, ...mockNotificaciones]);
      } else {
        setNotificaciones(mockNotificaciones);
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
          type={notificacion.type}
          name={notificacion.name}
          date={notificacion.date}
          text={notificacion.text}
          avatar={notificacion.avatar}
          readed={notificacion.readed}
          commentText={notificacion.commentText}
          imageUrl={notificacion.imageUrl}
        />
      ))}
    </div>
  );
}