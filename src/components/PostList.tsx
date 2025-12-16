import { useState, useEffect } from 'react';
import Post from './Post';
import type { PostData } from '../mockup';
import { mockPostsFeed } from '../mockup';


export default function PostList() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    // Cargar posts desde localStorage
    const storedPosts = localStorage.getItem('posts');

    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      // Combinar posts del localStorage con los posts por defecto
      setPosts([...parsedPosts, ...mockPostsFeed]);
    } else {
      // Si no hay posts en localStorage, usar solo los por defecto
      setPosts(mockPostsFeed);
    }
  }, []);

  return (
    <div className="posts-list">
      {posts.map((post, index) => (
        <Post
          key={index}
          author={post.author}
          action={post.action}
          date={post.date}
          likes={post.likes}
          comments={post.comments}
          location={post.location}
        >
          <p>{post.content}</p>
        </Post>
      ))}
    </div>
  );
}
