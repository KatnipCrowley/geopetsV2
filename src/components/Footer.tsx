import { Link, useLocation } from "react-router-dom";
import { HomeIcon, MapIcon, PlusCircleIcon, BellIcon } from "@heroicons/react/24/outline";
import "./Footer.css";
import { mockUser } from "../mockup";

export default function FooterButtons() {
  const location = useLocation();
  // Puedes reemplazar esto con el número real de notificaciones
  const unreadNotifications = 3;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="footer-buttons-container">
      {/* Principal */}
      <Link to="/principal" className={`footer-nav-button ${isActive('/principal') ? 'active' : ''}`}>
        <HomeIcon
          className="footer-icon"
          strokeWidth={isActive('/principal') ? 2.5 : 1.5}
        />
      </Link>

      {/* Mapa */}
      <Link to="/mapa" className={`footer-nav-button ${isActive('/mapa') ? 'active' : ''}`}>
        <MapIcon
          className="footer-icon"
          strokeWidth={isActive('/mapa') ? 2.5 : 1.5}
        />
      </Link>

      {/* Nuevo Post */}
      <Link to="/nueva-publicacion" className={`footer-nav-button ${isActive('/nueva-publicacion') ? 'active' : ''}`}>
        <PlusCircleIcon
          className="footer-icon"
          strokeWidth={isActive('/nueva-publicacion') ? 2.5 : 1.5}
        />
      </Link>

      {/* Notificaciones */}
      <Link to="/notificaciones" className={`footer-nav-button ${isActive('/notificaciones') ? 'active' : ''}`}>
        <div className="notification-wrapper">
          <BellIcon
            className="footer-icon"
            strokeWidth={isActive('/notificaciones') ? 2.5 : 1.5}
          />
          {unreadNotifications > 0 && (
            <span className="notification-badge">{unreadNotifications}</span>
          )}
        </div>
      </Link>

      {/* Perfil */}
      <Link to="/perfil" className={`footer-nav-button ${isActive('/perfil') ? 'active' : ''}`}>
        <img
          src={mockUser.avatar}
          alt="Perfil"
          className={`footer-profile-img ${isActive('/perfil') ? 'active' : ''}`}
        />
      </Link>
    </div>
  );
}
