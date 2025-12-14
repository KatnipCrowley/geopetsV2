interface NotificacionOptions {
  type: 'follower' | 'alert' | 'comment';
  name: string;
  date: string;
  text: string;
  avatar?: string;
  readed?: boolean;
  commentText?: string;
  imageUrl?: string;
}

import './Notificacion.css';

export default function Notificacion({ type, name, date, text, avatar, readed, commentText, imageUrl }: NotificacionOptions) {

  const renderActionButton = () => {
    switch (type) {
      case 'follower':
        return (
          <button className="notif-action-btn action-btn-follow">
            Seguir
          </button>
        );
      case 'alert':
        return (
          <button className="notif-action-btn action-btn-view">
            Ver
          </button>
        );
      case 'comment':
        return (
          <div className="notif-comment-image">
            {imageUrl ? (
              <img src={imageUrl} alt="Comment attachment" />
            ) : (
              <div className="notif-image-placeholder">📷</div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="notif-item">
      <div className={`notif-indicator ${readed ? 'notif-readed' : 'notif-unreaded'}`} />

      <div className="notif-avatar">
        {avatar ? (
          <img src={avatar} alt={`${name}'s avatar`} />
        ) : (
          <img src={`https://picsum.photos/50/50?random=${Math.floor(Math.random() * 100)}`} alt="Default avatar" />
        )}
      </div>

      <div className="notif-content">
        <div className="notif-header">
          <span className="notif-name">{name}</span>
          <span className="notif-date">{date}</span>
        </div>
        <div className="notif-text">
          {text}
          {type === 'comment' && commentText && (
            <span className="notif-comment-text"> "{commentText}"</span>
          )}
        </div>
      </div>

      <div className="notif-action">
        {renderActionButton()}
      </div>
    </div>
  );
}