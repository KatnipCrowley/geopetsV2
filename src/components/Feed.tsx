interface footeroptions {
  title?: string;
  subtitle?: string;
}
export default function FeedComponent({title, subtitle}: footeroptions) {
  return (
    <footer>
        <p>{title} 1</p>
      <p>{subtitle}Aplicación web con OpenStreetMap y Firebase | Desarrollado como ejemplo educativo</p>
    </footer>
  );
}
