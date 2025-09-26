/// <reference types="@react-three/fiber" />

import React, { Suspense, useRef, useState } from 'react';
import { Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import CelestialBody from './CelestialBody.tsx';
import CameraManager from './CameraManager.tsx';
import AsteroidBelt from './AsteroidBelt.tsx';
import KuiperBelt from './KuiperBelt.tsx';
import { SOLAR_SYSTEM_DATA } from '../constants/solarSystemData.ts';
import type { CelestialBodyData } from '../types.ts';

interface SolarSystemProps {
  selectedBody: CelestialBodyData | null;
  onSelectBody: (body: CelestialBodyData) => void;
  onPlayHoverSound: () => void;
  showAdvancedMoons: boolean;
  showAsteroidBelt: boolean;
  showKuiperBelt: boolean;
  showEris: boolean;
  keysPressed: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
  };
  sunTexture: 'A' | 'B';
}

const LoadingFallback = () => (
    <Html center>
      <div className="loading-indicator">
        Cargando Sistema Solar...
      </div>
    </Html>
);

const SolarSystem: React.FC<SolarSystemProps> = ({ 
  selectedBody, 
  onSelectBody, 
  onPlayHoverSound,
  showAdvancedMoons,
  showAsteroidBelt,
  showKuiperBelt,
  showEris,
  keysPressed,
  sunTexture,
}) => {
  const controlsRef = useRef<any>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  
  const isNavigatingWithKeys = Object.values(keysPressed).some(v => v);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ambientLight intensity={0.1} />
      <Stars radius={300} depth={50} count={10000} factor={7} saturation={0} fade speed={1} />
      
      {showAsteroidBelt && <AsteroidBelt />}
      {showKuiperBelt && <KuiperBelt />}

      {SOLAR_SYSTEM_DATA.map(body => {
        // Hide asteroids if the belt is toggled off
        if (body.type === 'asteroid' && !showAsteroidBelt) {
            return null;
        }
        // Hide Eris if it's toggled off
        if (body.id === 'eris' && !showEris) {
            return null;
        }
        return (
            <CelestialBody 
              key={body.id} 
              data={body} 
              onSelect={onSelectBody}
              isSelected={selectedBody?.id === body.id || (selectedBody?.id === 'moon' && body.id === 'earth')}
              isAnyBodySelected={!!selectedBody}
              onPlayHoverSound={onPlayHoverSound}
              showAdvancedMoons={showAdvancedMoons}
              sunTexture={sunTexture}
            />
        );
      })}
      
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={!selectedBody && !isInteracting && !isNavigatingWithKeys} // Pause autorotate when navigating
        autoRotateSpeed={0.2}
        minDistance={10}
        maxDistance={500}
        onStart={() => setIsInteracting(true)}
        onEnd={() => setIsInteracting(false)}
      />
      
      <CameraManager 
        selectedBody={selectedBody} 
        controlsRef={controlsRef}
        isInteracting={isInteracting}
        keysPressed={keysPressed}
      />
    </Suspense>
  );
};

export default SolarSystem;