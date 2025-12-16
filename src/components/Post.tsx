import MiniMapa from './MiniMapa';
import { HeartIcon, ChatBubbleLeftIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import './Post.css';
import { mockUser } from '../mockup';

interface PostOptions {
  author: string;
  action: string;
  date: string;
  likes: number;
  comments: number;
  location?: [number, number];
  children: React.ReactNode;
}

const profileUrl = "https://picsum.dev/64?seed={seed}";

export default function Post({ author, action, date, likes, comments, location, children }: PostOptions) {
  let avatarUrl = author !== mockUser.username ? profileUrl.replace("{seed}", author) : mockUser.avatar;

  return (
    <div className="post-container">
      {/* Header: Avatar, Nombre, Acción y Menú */}
      <div className="post-header">
        <div className="post-header-content">
          <div className="post-avatar">
            <img src={avatarUrl} alt={author} />
          </div>
          <div className="post-author-info">
            <div className="post-author-name">
              <strong>{author}</strong> {action}
            </div>
            <div className="post-date">{date}</div>
          </div>
        </div>
        <button className="post-menu-button" aria-label="Más opciones">
          <EllipsisHorizontalIcon className="post-menu-icon" />
        </button>
      </div>

      {/* Mapa (si existe) */}
      {location && (
        <div className="post-map">
          <MiniMapa position={location} />
        </div>
      )}

      {/* Contenido del post */}
      <div className="post-content">
        {children}
      </div>

      {/* Footer: Likes y Comentarios */}
      <div className="post-footer">
        <div className="post-stat">
          <HeartIcon className="post-icon" />
          <span>{likes} Me gusta</span>
        </div>
        <div className="post-stat">
          <ChatBubbleLeftIcon className="post-icon" />
          <span>{comments} Comentarios</span>
        </div>
      </div>
    </div>
  );
}