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
        <h3>{author}</h3>
        <p>{action} - {date}</p>
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