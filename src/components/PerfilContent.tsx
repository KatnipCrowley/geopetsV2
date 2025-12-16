import { useState } from 'react';
import Post from "./Post";
import {
  MapPinIcon,
  CalendarIcon,
  UserGroupIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import './Perfil.css';
import { mockPets, mockUser, type PetData } from '../mockup';


export default function PerfilContent() {
  const [activeTab, setActiveTab] = useState<'posts' | 'pets' | 'likes'>('posts');
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');

  return (
    <div className="perfil-page">
      {/* Cover Image */}
      <div className="perfil-cover">
        <img src={mockUser.coverImage} alt="Cover" />
      </div>

      {/* Profile Header */}
      <div className="perfil-header">
        <div className="perfil-avatar-container">
          <img src={mockUser.avatar} alt={mockUser.username} className="perfil-avatar" />
        </div>

        <button className="perfil-settings-btn" aria-label="Configuración">
          <Cog6ToothIcon className="settings-icon" />
        </button>

        <div className="perfil-info">
          <h1 className="perfil-username">{mockUser.username}</h1>
          <p className="perfil-handle">@{mockUser.handle}</p>

          <p className="perfil-bio">{mockUser.bio}</p>

          <div className="perfil-meta">
            <div className="perfil-meta-item">
              <MapPinIcon className="meta-icon" />
              <span>{mockUser.location}</span>
            </div>
            <div className="perfil-meta-item">
              <CalendarIcon className="meta-icon" />
              <span>Se unió en {mockUser.joinDate}</span>
            </div>
          </div>

          <div className="perfil-stats">
            <div className="stat-item">
              <span className="stat-number">{posts.length}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{mockUser.stats.followers}</span>
              <span className="stat-label">Seguidores</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{mockUser.stats.following}</span>
              <span className="stat-label">Siguiendo</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{mockPets.length}</span>
              <span className="stat-label">Mascotas</span>
            </div>
          </div>

          <div className="perfil-actions">
            <button className="btn-primary">
              <UserGroupIcon className="btn-icon" />
              Editar perfil
            </button>
            <button className="btn-secondary">Compartir perfil</button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="perfil-tabs">
        <button
          className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Publicaciones
        </button>
        <button
          className={`tab-btn ${activeTab === 'pets' ? 'active' : ''}`}
          onClick={() => setActiveTab('pets')}
        >
          Mascotas
        </button>
        <button
          className={`tab-btn ${activeTab === 'likes' ? 'active' : ''}`}
          onClick={() => setActiveTab('likes')}
        >
          Me gusta
        </button>
      </div>

      {/* Posts Section */}
      <div className="perfil-posts">
        {activeTab === 'posts' && (JSON.parse(localStorage.getItem('posts') || '[]')).map((post: any) => (
          <Post
            key={post.id}
            author={post.author}
            action={post.action}
            date={post.date}
            likes={post.likes}
            comments={post.comments}
            location={post.location}
          >
            {post.content}
          </Post>
        ))}

        {activeTab === 'pets' && (
          mockPets.map((pet: PetData) => (
            <div key={pet.id}>
              <h2>{pet.name}</h2>
              <p>{pet.type}</p>
              <p>{pet.age}</p>
              <p>{pet.gender}</p>
              <p>{pet.breed}</p>
            </div>
          ))
        )}

        {activeTab === 'likes' && (
          <div className="empty-state">
            <p>❤️</p>
            <p>Publicaciones que te gustan aparecerán aquí</p>
          </div>
        )}
      </div>
    </div>
  );
}
