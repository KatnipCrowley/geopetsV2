import { useState, useEffect } from "react";
import Notificacion from "./Notificacion";

interface NotificacionData {
  id: string;
  name: string;
  date: string;
  text: string;
  type: 'follower' | 'alert' | 'comment';
  avatar?: string;
  readed?: boolean;
  commentText?: string;
  imageUrl?: string;
}

const notificacionesPorDefecto: NotificacionData[] = [
  {
    id: '1',
    type: 'follower',
    name: 'Carlos Mendez',
    date: 'Hace 1 hora',
    text: 'Comenzó a seguirte',
    readed: false
  },
  {
    id: '2',
    type: 'alert',
    name: 'Sistema',
    date: 'Hace 3 horas',
    text: 'Alguien ha visto tu mascota',
    readed: false
  },
  {
    id: '3',
    type: 'comment',
    name: 'Ana García',
    date: 'Hace 1 día',
    text: 'Hizo un comentario',
    commentText: '¡Qué linda mascota! Me encanta 🐶',
    imageUrl: 'https://picsum.photos/60/60?random=1',
    readed: true
  },
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