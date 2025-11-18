import { Link } from "react-router-dom";
import "./Footer.css";

export default function FooterButtons() {
  return (
    <div className="footer-buttons-container">
      <div className="footer-button"><Link to="/">Inicio</Link></div>
      <div className="footer-button"><Link to="/feed">Feed</Link></div>
      <div className="footer-button"><Link to="/notificaciones">Notificaciones</Link></div>
      <div className="footer-button"><Link to="/mensajes">Mensajes</Link></div>
    </div>
  );
}
