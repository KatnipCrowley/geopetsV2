export default function LocationForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Este es un mockup - La funcionalidad se implementará más adelante');
  };

  return (
    <form id="location-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="location-name">Nombre:</label>
        <input type="text" id="location-name" placeholder="Ej: Mi restaurante favorito" required />
      </div>

      <div className="form-group">
        <label htmlFor="location-description">Descripción:</label>
        <textarea id="location-description" placeholder="Describe este lugar..."></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="location-category">Categoría:</label>
        <select id="location-category" required>
          <option value="restaurant">Restaurante</option>
          <option value="park">Parque</option>
          <option value="landmark">Punto de interés</option>
          <option value="other">Otro</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Haz clic en el mapa para seleccionar la ubicación</label>
        <div id="coordinates">Latitud: -, Longitud: -</div>
      </div>
      
      <button type="submit">Guardar Ubicación</button>
    </form>
  );
}
