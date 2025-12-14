import { useState } from 'react';
import './Notificacion.css';

export default function HeaderTitle() {
  const [activeTab, setActiveTab] = useState<'para-ti' | 'importante'>('para-ti');

  return (
    <header className="notif-header-title">
      <div className="header-tabs">
        <button
          className={`header-tab ${activeTab === 'para-ti' ? 'active' : ''}`}
          onClick={() => setActiveTab('para-ti')}
        >
          Para ti
        </button>
        <button
          className={`header-tab ${activeTab === 'importante' ? 'active' : ''}`}
          onClick={() => setActiveTab('importante')}
        >
          Importante
        </button>
      </div>
    </header>
  );
}