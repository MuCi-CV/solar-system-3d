import React from 'react';
import type { CelestialBodyData } from '../types.ts';

interface InfoPanelProps {
  body: CelestialBodyData | null;
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrevious: () => void;
  onPlayHoverSound: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ body, onClose, onSelectNext, onSelectPrevious, onPlayHoverSound }) => {
  if (!body) {
    return <div className="info-panel" />;
  }

  return (
    <div className={`info-panel ${body ? 'visible' : ''}`}>
      <div>
        <button className="close-button" onClick={onClose} onMouseEnter={onPlayHoverSound} aria-label="Cerrar panel">×</button>
        <h2>{body.name}</h2>
        <p>{body.description}</p>
        <ul>
          <li>
            <strong>Diámetro</strong>
            {body.diameter}
          </li>
          <li>
            <strong>Distancia al Sol</strong>
            {body.distanceFromSun}
          </li>
          <li>
            <strong>Período Orbital</strong>
            {body.orbitalPeriod}
          </li>
        </ul>
      </div>
      <div className="nav-buttons">
        <button 
          className="nav-button" 
          onClick={onSelectPrevious}
          onMouseEnter={onPlayHoverSound}
        >
          ← Anterior
        </button>
        <button 
          className="nav-button" 
          onClick={onSelectNext}
          onMouseEnter={onPlayHoverSound}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default InfoPanel;