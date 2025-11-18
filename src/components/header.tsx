import './Notificacion.css';

interface HeaderOptions {
  title: string;
}

export default function HeaderTitle({ title }: HeaderOptions) {
  return (
    <header className="notif-header-title notif-title">
      {title}
    </header>
  );
}