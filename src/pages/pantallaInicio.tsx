import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Pantalla de inicio que aparece antes de Principal.tsx.
 * - Explica brevemente cómo usar el mapa del proyecto GeoPets.
 * - Guarda en localStorage si el usuario no quiere volver a verla.
 *
 * Colocar este archivo en: /src/pages/pantallaInicio.tsx
 */

export default function PantallaInicio() {
    const navigate = useNavigate();
    const [dontShowAgain, setDontShowAgain] = useState<boolean>(() => {
        try {
            return localStorage.getItem("geopets_skip_intro") === "true";
        } catch {
            return false;
        }
    });

    function handleContinue() {
        try {
            localStorage.setItem("geopets_skip_intro", dontShowAgain ? "true" : "false");
        } catch {
            // ignore storage errors
        }
        navigate("/principal");
    }

    return (
        <main
            style={{
                maxWidth: 920,
                margin: "40px auto",
                padding: 24,
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                color: "#1f2937",
            }}
            aria-labelledby="titulo-intro"
        >
            <h1 id="titulo-intro" style={{ marginBottom: 8 }}>
                Bienvenido a GeoPets
            </h1>

            <p style={{ marginTop: 0, color: "#4b5563" }}>
                Esta pantalla explica cómo usar el mapa. Te ayudará a encontrar mascotas, reportar ubicaciones y
                navegar por los puntos de interés.
            </p>

            <section style={{ marginTop: 18 }}>
                <h2 style={{ fontSize: 16, marginBottom: 8 }}>Cómo usar el mapa</h2>
                <ul style={{ lineHeight: 1.6, color: "#374151" }}>
                    <li>
                        🔍 Buscar: usa la barra de búsqueda (si está disponible) para encontrar direcciones o lugares.
                    </li>
                    <li>📍 Ver marcadores: los iconos en el mapa representan mascotas, refugios u observaciones.</li>
                    <li>➕ Añadir reporte: toca o haz clic en el mapa (o usa el botón "Agregar") para crear un nuevo punto.</li>
                    <li>📎 Información: pulsa sobre un marcador para ver detalles y opciones (editar, compartir, comentar).</li>
                    <li>📡 Localizarme: usa el botón de ubicación para centrar el mapa en tu posición actual.</li>
                    <li>🗂️ Filtros/Capas: activa filtros para ver solo ciertos tipos de mascotas o mostrarlos por categoría.</li>
                    <li>🔎 Zoom y arrastre: usa gestos o controles + / - para acercar/alejar y arrastra para explorar.</li>
                </ul>
            </section>

            <section style={{ marginTop: 18 }}>
                <h2 style={{ fontSize: 16, marginBottom: 8 }}>Consejos rápidos</h2>
                <ul style={{ lineHeight: 1.6, color: "#374151" }}>
                    <li>Guarda ubicaciones importantes para acceder rápidamente desde la pantalla principal.</li>
                    <li>Si compartes ubicaciones, evita incluir datos personales sensibles en las descripciones.</li>
                    <li>
                        Revisa permisos de ubicación en tu dispositivo para que la función "Localizarme" funcione correctamente.
                    </li>
                </ul>
            </section>

            <footer style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#374151" }}>
                    <input
                        type="checkbox"
                        checked={dontShowAgain}
                        onChange={(e) => setDontShowAgain(e.target.checked)}
                        aria-label="No mostrar esta pantalla de nuevo"
                    />
                    No mostrar de nuevo
                </label>

                <div style={{ marginLeft: "auto" }}>
                    <button
                        onClick={handleContinue}
                        style={{
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "10px 16px",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                        aria-label="Continuar a la aplicación principal"
                    >
                        Continuar
                    </button>
                </div>
            </footer>
        </main>
    );
}