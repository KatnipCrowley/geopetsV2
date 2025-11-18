import MiniMapa from './MiniMapa';
import './Post.css';

interface PostOptions {
  author: string;
  action: string;
  date: string;
  likes: number;
  comments: number;
  location?: [number, number];
  children: React.ReactNode;
}

export default function Post({ author, action, date, likes, comments, location, children }: PostOptions) {
  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-header-left">
          <div className="post-avatar">
            <img src={`https://picsum.dev/static/${Math.floor(Math.random() * 100)}/64/64`} alt={author} />
          </div>
          <div className="post-author-info">
            <b>{author}</b> {action}
          </div>
        </div>
        <div className="post-header-date">
          {date}
        </div>
      </div>
      <div className="post-content">
        {location && <MiniMapa position={location} />}
        {children}
      </div>
      <div className="post-footer">
        <span>{likes} Likes</span>
        <span>{comments} Comments</span>
      </div>
    </div>
  );
}