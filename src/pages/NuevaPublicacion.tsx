import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from '../components/header';
import FooterButtons from '../components/Footer';
import MapaPicker from '../components/MapaPicker';
import './../components/NuevaPublicacion.css';

export default function NuevaPublicacion() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [hasLocation, setHasLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí iría la lógica para guardar el post en local storage
    const newPost = {
      author: 'Usuario Actual', // Esto vendría del usuario logueado
      action: hasLocation ? 'compartió una ubicación' : 'publicó',
      date: 'Hace unos momentos',
      likes: 0,
      comments: 0,
      location: hasLocation ? selectedLocation : undefined,
      content: content
    };

    console.log('Nuevo post:', newPost);
    
    // Guardar en localStorage
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Redirigir al feed después de crear el post
    navigate('/feed');
  };

  const handleAddLocation = () => {
    setShowMapPicker(true);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation([lat, lng]);
    setHasLocation(true);
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      setShowMapPicker(false);
    }
  };

  const handleCancelLocation = () => {
    setShowMapPicker(false);
    setSelectedLocation(null);
    setHasLocation(false);
  };

  const handleRemoveLocation = () => {
    setSelectedLocation(null);
    setHasLocation(false);
  };

  const handleDeleteAllPosts = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todas tus publicaciones? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('posts');
      alert('Todas las publicaciones han sido eliminadas.');
    }
  };

  return (
    <>
      <HeaderTitle title="Nueva publicación" />
      <div className="nueva-publicacion-container">
        <form onSubmit={handleSubmit} className="nueva-publicacion-form">
          <div className="form-user-info">
            <div className="form-avatar">
              <img 
                src={`https://picsum.dev/static/42/64/64`} 
                alt="Tu avatar" 
              />
            </div>
            <div className="form-user-name">Usuario Actual</div>
          </div>

          <div className="form-content-area">
            <textarea
              className="form-textarea"
              placeholder="¿Qué quieres compartir?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              maxLength={500}
              rows={6}
            />
            <div className="character-count">
              {content.length}/500
            </div>
          </div>

          {showMapPicker && (
            <div className="map-picker-section">
              <h3 className="map-picker-title">
                📍 Selecciona una ubicación en el mapa
              </h3>
              <p className="map-picker-instruction">
                Haz clic en el mapa para seleccionar la ubicación exacta
              </p>
              <MapaPicker 
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
              />
              {selectedLocation && (
                <div className="selected-coords">
                  📍 Coordenadas: {selectedLocation[0].toFixed(4)}, {selectedLocation[1].toFixed(4)}
                </div>
              )}
              <div className="map-picker-actions">
                <button 
                  type="button" 
                  className="cancel-map-btn"
                  onClick={handleCancelLocation}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="confirm-map-btn"
                  onClick={handleConfirmLocation}
                  disabled={!selectedLocation}
                >
                  Confirmar ubicación
                </button>
              </div>
            </div>
          )}

          {hasLocation && selectedLocation && !showMapPicker && (
            <div className="location-preview">
              <div className="location-preview-header">
                <span className="location-icon">📍</span>
                <span className="location-text">
                  Ubicación agregada: {selectedLocation[0].toFixed(4)}, {selectedLocation[1].toFixed(4)}
                </span>
                <button 
                  type="button" 
                  className="remove-location-btn"
                  onClick={handleRemoveLocation}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className="form-actions">
            <div className="additional-options">
              <button 
                type="button" 
                className="option-button"
                onClick={handleAddLocation}
                disabled={hasLocation || showMapPicker}
              >
                📍 {hasLocation ? 'Ubicación agregada' : 'Agregar ubicación'}
              </button>
              <button type="button" className="option-button" disabled>
                📷 Agregar foto
              </button>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={content.trim().length === 0}
            >
              Publicar
            </button>
          </div>
        </form>

        <div className="form-tips">
          <h3>💡 Consejos</h3>
          <ul>
            <li>Comparte experiencias interesantes de lugares que visites</li>
            <li>Agrega una ubicación para que otros puedan encontrar el lugar</li>
            <li>Sé respetuoso y constructivo en tus publicaciones</li>
          </ul>
        </div>

        <div className="danger-zone">
          <button 
            type="button" 
            className="delete-all-button"
            onClick={handleDeleteAllPosts}
          >
            🗑️ Eliminar todas las publicaciones
          </button>
        </div>
      </div>
      <FooterButtons />
    </>
  );
}