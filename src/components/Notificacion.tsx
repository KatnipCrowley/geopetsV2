interface NotificacionOptions {
  name: string;
  date: string;
  text: string;
  avatar?: string;
  readed?: boolean;
}

import './Notificacion.css';

export default function Notificacion({ name, date, text, avatar, readed }: NotificacionOptions) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '15px 20px 15px 25px', backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0' }}>
      <div className={`notif-${readed ? 'readed' : 'unreaded'}`} />
      <div className="notif-avatar">
        {
          avatar ?
          <img src={avatar} alt={`${name}'s avatar`} /> :
          <div className="placeholder-avatar" />
        }
      </div>
      <div className="notif-content">
        <div className="notif-header">
          <span className="notif-name">{name}</span>
          <span className="notif-date">{date}</span>
        </div>
        <div className="notif-text">{text}</div>
      </div>
    </div>
  )
}