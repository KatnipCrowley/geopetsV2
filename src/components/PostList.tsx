import { useState, useEffect } from 'react';
import Post from './Post';

interface PostData {
  author: string;
  action: string;
  date: string;
  likes: number;
  comments: number;
  location?: [number, number];
  content: string;
}

const defaultPosts: PostData[] = [
  {
    author: "María González",
    action: "compartió una ubicación",
    date: "hace 2 horas",
    likes: 45,
    comments: 12,
    location: [40.4168, -3.7038],
    content: "¡Encontré este lugar increíble en el centro de Madrid! Totalmente recomendado para comer."
  },
  {
    author: "Carlos Ruiz",
    action: "marcó un punto de interés",
    date: "hace 5 horas",
    likes: 78,
    comments: 23,
    location: [41.3851, 2.1734],
    content: "La vista desde aquí es espectacular. Si vienen a Barcelona, no se lo pierdan."
  },
  {
    author: "Ana Martínez",
    action: "publicó",
    date: "hace 1 día",
    likes: 156,
    comments: 45,
    content: "¿Alguien conoce buenos lugares para hacer senderismo cerca de Valencia? Busco rutas de nivel intermedio."
  },
  {
    author: "Juan Pérez",
    action: "compartió una experiencia",
    date: "hace 2 días",
    likes: 89,
    comments: 31,
    content: "Acabo de terminar mi ruta de 20km. ¡Qué satisfacción! El entrenamiento para la maratón va viento en popa 🏃‍♂️"
  },
  {
    author: "Laura Sánchez",
    action: "preguntó",
    date: "hace 3 días",
    likes: 34,
    comments: 18,
    content: "¿Cuál es su aplicación favorita para planificar rutas de ciclismo? Necesito recomendaciones urgentes."
  }
];

export default function PostList() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    // Cargar posts desde localStorage
    const storedPosts = localStorage.getItem('posts');
    
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      // Combinar posts del localStorage con los posts por defecto
      setPosts([...parsedPosts, ...defaultPosts]);
    } else {
      // Si no hay posts en localStorage, usar solo los por defecto
      setPosts(defaultPosts);
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
