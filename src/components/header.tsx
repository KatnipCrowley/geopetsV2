import './header.css';

interface headeroptions {
  title?: string;
}

const MiVariable = 42;

export default function Header({title}: headeroptions) {
  return (
    <>
      <header className="custom-header">
        <h1>{title}</h1>
      </header>

      <br />

      <h1>Hola</h1>
      <p>Este es un párrafo adicional.</p>
      {MiVariable}
      <div className="div_1">Otro div</div>
    </>
  );
}