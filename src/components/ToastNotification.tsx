import { useEffect, useState } from 'react';
import './ToastNotification.css';

interface Toast {
  id: string;
  titulo: string;
  tipo: string;
}

export default function ToastNotification() {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    const handleNewAviso = () => {
      const avisos = JSON.parse(localStorage.getItem('avisos') || '[]');
      if (avisos.length > 0) {
        const latest = avisos[0];
        setToast({
          id: latest.id,
          titulo: latest.titulo,
          tipo: latest.tipoAviso,
        });
        setTimeout(() => setToast(null), 5000);
      }
    };

    window.addEventListener('notificacionesUpdate', handleNewAviso);
    return () => window.removeEventListener('notificacionesUpdate', handleNewAviso);
  }, []);



  const getTipoAvisoName = (tipo: string): string => {
    const tipos: Record<string, string> = {
      'mascota-perdida': 'Mascota perdida',
      'mascota-encontrada': 'Mascota encontrada',
      'adopcion': 'En adopción',
      'alerta': 'Alerta de seguridad',
      'servicio': 'Servicio veterinario',
      'otro': 'Otro'
    };
    return tipos[tipo] || 'Otro';
  };

  const getTipoIcon = (tipo: string): string => {
    const iconos: Record<string, string> = {
      'mascota-perdida': '🐾',
      'mascota-encontrada': '✅',
      'adopcion': '❤️',
      'alerta': '⚠️',
      'servicio': '🏥',
      'otro': '📢'
    };
    return iconos[tipo] || '📢';
  };

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className="toast">
        <div className="toast-header">
          <div className="toast-title">
            <span>{getTipoIcon(toast.tipo)}</span>
            <span>Nuevo aviso cerca de ti</span>
          </div>
          <button 
            className="toast-close"
            onClick={() => setToast(null)}
          >
            ×
          </button>
        </div>
        <div className="toast-body">
          <strong>{toast.titulo}</strong>
          <div style={{ marginTop: '4px', fontSize: '12px', color: '#0066cc' }}>
            {getTipoAvisoName(toast.tipo)}
          </div>
          <div className="toast-time">Ahora</div>
        </div>
      </div>
    </div>
  );
}
