import { mockLocations, getCategoryName, getCategoryClass } from '../data/mockData';

export default function LocationsList() {
  return (
    <div className="locations-list">
      <h3>Ubicaciones Guardadas</h3>
      <div id="locations-container">
        {mockLocations.map((location) => (
          <div key={location.id} className="location-item">
            <div className="location-name">{location.name}</div>
            <div className="location-description">{location.description}</div>
            <span className={`location-category ${getCategoryClass(location.category)}`}>
              {getCategoryName(location.category)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
