import React from 'react';

interface SettingsProps {
  isOpen: boolean;
  audioEnabled: boolean;
  backgroundVolume: number;
  uiVolume: number;
  onToggleAudio: () => void;
  onBackgroundVolumeChange: (volume: number) => void;
  onUiVolumeChange: (volume: number) => void;
  onPlayHoverSound: () => void;
  showAdvancedMoons: boolean;
  onToggleAdvancedMoons: () => void;
  showAsteroidBelt: boolean;
  onToggleAsteroidBelt: () => void;
  showKuiperBelt: boolean;
  onToggleKuiperBelt: () => void;
  showEris: boolean;
  onToggleEris: () => void;
  sunTexture: 'A' | 'B';
  onToggleSunTexture: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  isOpen,
  audioEnabled,
  backgroundVolume,
  uiVolume,
  onToggleAudio,
  onBackgroundVolumeChange,
  onUiVolumeChange,
  onPlayHoverSound,
  showAdvancedMoons,
  onToggleAdvancedMoons,
  showAsteroidBelt,
  onToggleAsteroidBelt,
  showKuiperBelt,
  onToggleKuiperBelt,
  showEris,
  onToggleEris,
  sunTexture,
  onToggleSunTexture,
}) => {
  return (
    <div className={`settings-panel ${isOpen ? 'visible' : ''}`} aria-hidden={!isOpen}>
      <h2>Ajustes</h2>
      
      <div className="settings-section">
        <h3>Visuales</h3>
        <div className="settings-control">
          <label htmlFor="moons-toggle">Mostrar Lunas</label>
          <label className="toggle-switch" onMouseEnter={onPlayHoverSound}>
            <input 
              type="checkbox" 
              id="moons-toggle"
              checked={showAdvancedMoons} 
              onChange={onToggleAdvancedMoons} 
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="settings-control">
          <label htmlFor="asteroid-belt-toggle">Cinturón de Asteroides</label>
          <label className="toggle-switch" onMouseEnter={onPlayHoverSound}>
            <input 
              type="checkbox" 
              id="asteroid-belt-toggle"
              checked={showAsteroidBelt} 
              onChange={onToggleAsteroidBelt} 
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="settings-control">
          <label htmlFor="kuiper-belt-toggle">Cinturón de Kuiper</label>
          <label className="toggle-switch" onMouseEnter={onPlayHoverSound}>
            <input 
              type="checkbox" 
              id="kuiper-belt-toggle"
              checked={showKuiperBelt} 
              onChange={onToggleKuiperBelt} 
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="settings-control">
          <label htmlFor="eris-toggle">Mostrar Eris</label>
          <label className="toggle-switch" onMouseEnter={onPlayHoverSound}>
            <input 
              type="checkbox" 
              id="eris-toggle"
              checked={showEris} 
              onChange={onToggleEris} 
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="settings-control">
          <label htmlFor="sun-texture-toggle">Textura Sol (Rayleigh)</label>
          <label className="toggle-switch" onMouseEnter={onPlayHoverSound}>
            <input 
              type="checkbox" 
              id="sun-texture-toggle"
              checked={sunTexture === 'B'} 
              onChange={onToggleSunTexture} 
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Audio</h3>
        <div className="settings-control">
          <label htmlFor="main-audio-toggle">Sonido Activado</label>
          <label className="toggle-switch" onMouseEnter={onPlayHoverSound}>
            <input 
              type="checkbox" 
              id="main-audio-toggle"
              checked={audioEnabled} 
              onChange={onToggleAudio} 
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="settings-control">
          <label htmlFor="main-bg-volume-slider">Música de Fondo</label>
          <input 
            type="range" 
            id="main-bg-volume-slider"
            min="0" 
            max="1" 
            step="0.01" 
            value={backgroundVolume} 
            onChange={(e) => onBackgroundVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
            disabled={!audioEnabled}
            onMouseEnter={onPlayHoverSound}
          />
        </div>
        <div className="settings-control">
          <label htmlFor="main-ui-volume-slider">Efectos de UI</label>
          <input 
            type="range" 
            id="main-ui-volume-slider"
            min="0" 
            max="1" 
            step="0.01" 
            value={uiVolume} 
            onChange={(e) => onUiVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
            disabled={!audioEnabled}
            onMouseEnter={onPlayHoverSound}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;