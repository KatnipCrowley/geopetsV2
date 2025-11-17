interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ 
    title = "Mapa Interactivo", 
    subtitle = "OpenStreetMap + Firebase" 
}: HeaderProps) {
    return (
        <header>
            <h1>{title}</h1>
            {subtitle && <p className="subtitle">{subtitle}</p>}
        </header>
    );
}
