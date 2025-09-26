import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import SolarSystem from './components/SolarSystem.tsx';
import InfoPanel from './components/InfoPanel.tsx';
import Settings from './components/Settings.tsx';
import type { CelestialBodyData } from './types.ts';
import { SOLAR_SYSTEM_DATA } from './constants/solarSystemData.ts';

// Audio URLs - Using reliable CDN links from the user's repository
const AMBIENT_SOUND_URL = 'https://raw.githubusercontent.com/MuCi-CV/deep-space-sound/main/public/sound/background/Deep%20Space.mp3';
const HOVER_SOUND_URL = 'https://raw.githubusercontent.com/MuCi-CV/deep-space-sound/main/public/sound/ui/rollover6.ogg';
const CLICK_SOUND_URL = 'https://raw.githubusercontent.com/MuCi-CV/deep-space-sound/main/public/sound/ui/mouseclick1.ogg';

// Find Earth's data to set as the initial state
const earthData = SOLAR_SYSTEM_DATA.find(body => body.id === 'earth');

interface WelcomeScreenProps {
  onStart: () => void;
  audioEnabled: boolean;
  backgroundVolume: number;
  uiVolume: number;
  onToggleAudio: () => void;
  onBackgroundVolumeChange: (volume: number) => void;
  onUiVolumeChange: (volume: number) => void;
  onPlayHoverSound: () => void;
  onPlayClickSound: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onStart, 
  audioEnabled, 
  backgroundVolume,
  uiVolume,
  onToggleAudio, 
  onBackgroundVolumeChange,
  onUiVolumeChange,
  onPlayHoverSound,
  onPlayClickSound
}) => {
  const [showAudioSettings, setShowAudioSettings] = useState(false);

  const toggleSettings = () => {
    onPlayClickSound();
    setShowAudioSettings(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSettings();
    }
  };
  
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h1 className="welcome-title">Sistema Solar Interactivo 3D</h1>
        <p className="welcome-subtitle">Una Exhibición del Museo de Ciencias</p>
        
        <div className="welcome-settings">
          <h2 
            className="settings-toggle-button"
            onClick={toggleSettings}
            onMouseEnter={onPlayHoverSound}
            onKeyDown={handleKeyDown}
            role="button"
            aria-expanded={showAudioSettings}
            aria-controls="audio-settings-container"
            tabIndex={0}
          >
            Ajustes de Audio <span>{showAudioSettings ? '−' : '+'}</span>
          </h2>
          
          <div 
            id="audio-settings-container"
            className={`audio-settings-collapsible ${showAudioSettings ? 'visible' : ''}`}
          >
            <div className="settings-control">
              <label htmlFor="audio-toggle">Sonido Activado</label>
              <label className="toggle-switch" onMouseEnter={onPlayHoverSound}>
                <input 
                  type="checkbox" 
                  id="audio-toggle"
                  checked={audioEnabled} 
                  onChange={onToggleAudio} 
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="settings-control">
              <label htmlFor="bg-volume-slider">Música de Fondo</label>
              <input 
                type="range" 
                id="bg-volume-slider"
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
              <label htmlFor="ui-volume-slider">Efectos de UI</label>
              <input 
                type="range" 
                id="ui-volume-slider"
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

        <button className="start-button" onClick={onStart} onMouseEnter={onPlayHoverSound}>
          Iniciar Exploración
        </button>
      </div>
    </div>
  );
};

interface KeyState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

const App: React.FC = () => {
  const [isExperienceStarted, setIsExperienceStarted] = useState(false);
  const [selectedBody, setSelectedBody] = useState<CelestialBodyData | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Audio State
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [backgroundVolume, setBackgroundVolume] = useState(0.05);
  const [uiVolume, setUiVolume] = useState(0.5);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Feature visibility state
  const [showAdvancedMoons, setShowAdvancedMoons] = useState(true);
  const [showAsteroidBelt, setShowAsteroidBelt] = useState(true);
  const [showKuiperBelt, setShowKuiperBelt] = useState(true);
  const [showEris, setShowEris] = useState(true);
  const [sunTexture, setSunTexture] = useState<'A' | 'B'>('A');

  // Keyboard navigation state
  const [keysPressed, setKeysPressed] = useState<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const hoverAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const unlockAudio = () => {
      setHasInteracted(true);
      window.removeEventListener('pointerdown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
    };
  }, []);

  useEffect(() => {
    const audio = ambientAudioRef.current;
    if (audio) {
      audio.volume = backgroundVolume;
      if (audioEnabled && hasInteracted && audio.paused) {
        audio.play().catch(error => console.error("Ambient audio play failed:", error));
      } else if (!audioEnabled || !hasInteracted) {
        audio.pause();
      }
    }
  }, [audioEnabled, backgroundVolume, hasInteracted]);
  
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            if (selectedBody) {
                setSelectedBody(null);
            } else {
                setIsSettingsOpen(prev => !prev);
            }
        }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
        window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [selectedBody]);

  // Keyboard navigation listeners
  useEffect(() => {
    const keyMap: { [key: string]: keyof KeyState } = {
      ArrowUp: 'forward',
      w: 'forward',
      W: 'forward',
      ArrowDown: 'backward',
      s: 'backward',
      S: 'backward',
      ArrowLeft: 'left',
      a: 'left',
      A: 'left',
      ArrowRight: 'right',
      d: 'right',
      D: 'right',
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = keyMap[e.key];
      if (key) {
        e.preventDefault();
        setKeysPressed((prev) => ({ ...prev, [key]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = keyMap[e.key];
      if (key) {
        e.preventDefault();
        setKeysPressed((prev) => ({ ...prev, [key]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);


  const playHoverSound = () => {
    if (audioEnabled && hasInteracted && hoverAudioRef.current) {
      hoverAudioRef.current.volume = uiVolume;
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.play().catch(error => console.error("Hover sound failed:", error));
    }
  };

  const playClickSound = () => {
    if (audioEnabled && hasInteracted && clickAudioRef.current) {
      clickAudioRef.current.volume = uiVolume;
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(error => console.error("Click sound failed:", error));
    }
  };
  
  const handleStartExperience = () => {
    playClickSound();
    setIsExperienceStarted(true);
  };

  const handleSelectNext = () => {
    playClickSound();
    if (!selectedBody) {
      setSelectedBody(SOLAR_SYSTEM_DATA[0]);
      return;
    }
    const currentIndex = SOLAR_SYSTEM_DATA.findIndex(body => body.id === selectedBody.id);
    const nextIndex = (currentIndex + 1) % SOLAR_SYSTEM_DATA.length;
    setSelectedBody(SOLAR_SYSTEM_DATA[nextIndex]);
  };

  const handleSelectPrevious = () => {
    playClickSound();
    if (!selectedBody) {
      setSelectedBody(SOLAR_SYSTEM_DATA[SOLAR_SYSTEM_DATA.length - 1]);
      return;
    }
    const currentIndex = SOLAR_SYSTEM_DATA.findIndex(body => body.id === selectedBody.id);
    const prevIndex = (currentIndex - 1 + SOLAR_SYSTEM_DATA.length) % SOLAR_SYSTEM_DATA.length;
    setSelectedBody(SOLAR_SYSTEM_DATA[prevIndex]);
  };

  const handleToggleAudio = () => {
    playClickSound();
    setAudioEnabled(prev => !prev);
  }

  const handleSettingsButtonClick = () => {
    playClickSound();
    setIsSettingsOpen(prev => !prev);
  };

  const handleSelectBody = (body: CelestialBodyData) => {
    playClickSound();
    setSelectedBody(body);
  };
  
  const handleToggleAsteroidBelt = () => {
    playClickSound();
    if (selectedBody?.type === 'asteroid') {
      setSelectedBody(null);
    }
    setShowAsteroidBelt(p => !p);
  };
  
  const handleToggleEris = () => {
    playClickSound();
    if (selectedBody?.id === 'eris') {
      setSelectedBody(null);
    }
    setShowEris(p => !p);
  };

  const handleToggleSunTexture = () => {
    playClickSound();
    setSunTexture(p => p === 'A' ? 'B' : 'A');
  };

  return (
    <>
      {!isExperienceStarted ? (
        <WelcomeScreen 
          onStart={handleStartExperience}
          audioEnabled={audioEnabled}
          backgroundVolume={backgroundVolume}
          uiVolume={uiVolume}
          onToggleAudio={handleToggleAudio}
          onBackgroundVolumeChange={setBackgroundVolume}
          onUiVolumeChange={setUiVolume}
          onPlayHoverSound={playHoverSound}
          onPlayClickSound={playClickSound}
        />
      ) : (
        <>
          <button 
            className="settings-button" 
            onClick={handleSettingsButtonClick}
            onMouseEnter={playHoverSound}
            aria-label="Abrir ajustes"
          >
            ⚙️
          </button>
          <Settings 
            isOpen={isSettingsOpen}
            audioEnabled={audioEnabled}
            backgroundVolume={backgroundVolume}
            uiVolume={uiVolume}
            onToggleAudio={handleToggleAudio}
            onBackgroundVolumeChange={setBackgroundVolume}
            onUiVolumeChange={setUiVolume}
            onPlayHoverSound={playHoverSound}
            showAdvancedMoons={showAdvancedMoons}
            onToggleAdvancedMoons={() => { playClickSound(); setShowAdvancedMoons(p => !p); }}
            showAsteroidBelt={showAsteroidBelt}
            onToggleAsteroidBelt={handleToggleAsteroidBelt}
            showKuiperBelt={showKuiperBelt}
            onToggleKuiperBelt={() => { playClickSound(); setShowKuiperBelt(p => !p); }}
            showEris={showEris}
            onToggleEris={handleToggleEris}
            sunTexture={sunTexture}
            onToggleSunTexture={handleToggleSunTexture}
          />
          <InfoPanel 
            body={selectedBody} 
            onClose={() => { playClickSound(); setSelectedBody(null); }}
            onSelectNext={handleSelectNext}
            onSelectPrevious={handleSelectPrevious}
            onPlayHoverSound={playHoverSound}
          />
          <Canvas 
            camera={{ position: [0, 50, 150], fov: 60 }} 
            shadows
            onPointerMissed={() => {
              if (selectedBody) {
                playClickSound();
                setSelectedBody(null);
              }
            }}
          >
            <SolarSystem 
              selectedBody={selectedBody} 
              onSelectBody={handleSelectBody}
              onPlayHoverSound={playHoverSound}
              showAdvancedMoons={showAdvancedMoons}
              showAsteroidBelt={showAsteroidBelt}
              showKuiperBelt={showKuiperBelt}
              showEris={showEris}
              keysPressed={keysPressed}
              sunTexture={sunTexture}
            />
          </Canvas>
        </>
      )}
      
      <audio ref={ambientAudioRef} src={AMBIENT_SOUND_URL} loop />
      <audio ref={hoverAudioRef} src={HOVER_SOUND_URL} />
      <audio ref={clickAudioRef} src={CLICK_SOUND_URL} />
    </>
  );
};

export default App;