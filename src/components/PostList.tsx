import Post from './Post';

export default function PostList() {
  return (
    <div className="posts-list">
      {/* Post con minimapa 1 */}
      <Post
        author="María González"
        action="compartió una ubicación"
        date="hace 2 horas"
        likes={45}
        comments={12}
        location={[40.4168, -3.7038]} // Madrid
      >
        <p>¡Encontré este lugar increíble en el centro de Madrid! Totalmente recomendado para comer.</p>
      </Post>

      {/* Post con minimapa 2 */}
      <Post
        author="Carlos Ruiz"
        action="marcó un punto de interés"
        date="hace 5 horas"
        likes={78}
        comments={23}
        location={[41.3851, 2.1734]} // Barcelona
      >
        <p>La vista desde aquí es espectacular. Si vienen a Barcelona, no se lo pierdan.</p>
      </Post>

      {/* Post normal 1 */}
      <Post
        author="Ana Martínez"
        action="publicó"
        date="hace 1 día"
        likes={156}
        comments={45}
      >
        <p>¿Alguien conoce buenos lugares para hacer senderismo cerca de Valencia? Busco rutas de nivel intermedio.</p>
      </Post>

      {/* Post normal 2 */}
      <Post
        author="Juan Pérez"
        action="compartió una experiencia"
        date="hace 2 días"
        likes={89}
        comments={31}
      >
        <p>Acabo de terminar mi ruta de 20km. ¡Qué satisfacción! El entrenamiento para la maratón va viento en popa 🏃‍♂️</p>
      </Post>

      {/* Post normal 3 */}
      <Post
        author="Laura Sánchez"
        action="preguntó"
        date="hace 3 días"
        likes={34}
        comments={18}
      >
        <p>¿Cuál es su aplicación favorita para planificar rutas de ciclismo? Necesito recomendaciones urgentes.</p>
      </Post>
    </div>
  );
}
