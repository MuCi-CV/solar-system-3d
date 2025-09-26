/// <reference types="@react-three/fiber" />

import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import type { CelestialBodyData } from '../types.ts';

interface CelestialBodyProps {
  data: CelestialBodyData;
  onSelect: (data: CelestialBodyData) => void;
  isSelected: boolean;
  isAnyBodySelected: boolean;
  onPlayHoverSound: () => void;
  showAdvancedMoons: boolean;
  sunTexture: 'A' | 'B';
}

const generateRingTexture = () => {
  const canvas = document.createElement('canvas');
  const size = 512;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) return null;

  const centerX = size / 2;
  const centerY = size / 2;

  const bands = [
      { radius: 250, width: 30, color: 'rgba(216, 201, 172, 0.9)' },
      { radius: 210, width: 40, color: 'rgba(199, 183, 154, 0.8)' },
      { radius: 190, width: 15, color: 'rgba(50, 50, 50, 0.8)' }, 
      { radius: 160, width: 30, color: 'rgba(216, 201, 172, 0.7)' },
      { radius: 120, width: 20, color: 'rgba(199, 183, 154, 0.6)' },
  ];

  for (let i = size; i > 0; i -= 2) {
    const band = bands.find(b => i < b.radius && i > b.radius - b.width);
    if(band) {
        context.beginPath();
        context.strokeStyle = band.color;
        context.lineWidth = 2;
        context.arc(centerX, centerY, i, 0, 2 * Math.PI);
        context.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};


const OrbitLine: React.FC<{ radius: number, isSelected: boolean, eccentricity?: number }> = ({ radius, isSelected, eccentricity = 0 }) => {
  const points = useMemo(() => {
    const pointArray = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        // Formula for ellipse in polar coordinates
        const r = radius * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(theta));
        pointArray.push(new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
    }
    return pointArray;
  }, [radius, eccentricity]);
  
  return (
    <Line 
        points={points}
        color={isSelected ? '#61dafb' : '#333333'} 
        transparent 
        opacity={isSelected ? 1 : 0.5} 
    />
  );
};


const CelestialBody: React.FC<CelestialBodyProps> = ({ data, onSelect, isSelected, isAnyBodySelected, onPlayHoverSound, showAdvancedMoons, sunTexture }) => {
  const bodyRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!); // This group moves along the orbit path
  const orbitGroupRef = useRef<THREE.Group>(null!); // This group defines the orbit's inclination
  const [hovered, setHovered] = useState(false);

  const sunTextureUrlB = 'https://cdn.jsdelivr.net/gh/MuCi-CV/deep-space-sound@main/public/images/sunmap2.jpg';
  
  const finalTextureUrl = data.id === 'sun' && sunTexture === 'B'
    ? sunTextureUrlB
    : data.textureUrl;

  const texture = useLoader(THREE.TextureLoader, finalTextureUrl);
  
  const ringTexture = useMemo(() => (data.ring ? generateRingTexture() : null), [data.ring]);
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (data.orbitRadius > 0 && groupRef.current) {
      const angle = (elapsedTime * data.orbitalSpeed * 0.1) + (data.initialOrbitAngle || 0);
      const ecc = data.orbitEccentricity || 0;
      // Using the same formula to keep the body on the elliptical path
      const r = data.orbitRadius * (1 - ecc * ecc) / (1 + ecc * Math.cos(angle));
      
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      groupRef.current.position.set(x, 0, z);
    }

    if (bodyRef.current) {
      bodyRef.current.rotation.y += data.rotationSpeed * 0.01;
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    onPlayHoverSound();
  };
  
  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(data);
  };

  // Use a more subtle, neutral white for both hover and selection to preserve texture color.
  const emissiveColor = isSelected || hovered ? '#ffffff' : '#000000';
  // Use a slightly stronger intensity for selection than hover, but keep it subtle.
  const emissiveIntensity = isSelected ? 0.20 : hovered ? 0.15 : 0;

  const scale = hovered ? 1.05 : 1;

  // Make non-selected planets slightly transparent when another is selected
  const materialOpacity = isAnyBodySelected && !isSelected ? 0.3 : 1;

  return (
    <group ref={orbitGroupRef} rotation={[THREE.MathUtils.degToRad(data.orbitInclination || 0), 0, 0]}>
      {data.orbitRadius > 0 && <OrbitLine radius={data.orbitRadius} isSelected={isSelected} eccentricity={data.orbitEccentricity} />}
      <group ref={groupRef} name={data.id}>
        <mesh 
          ref={bodyRef} 
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          scale={scale}
          castShadow={!data.isSun}
          receiveShadow={!data.isSun}
        >
          <sphereGeometry args={[data.size, 64, 64]} />
          {data.isSun ? 
            <meshBasicMaterial map={texture} toneMapped={false} /> :
            <meshStandardMaterial 
              map={texture} 
              roughness={0.9} 
              metalness={0.1} 
              emissive={emissiveColor}
              emissiveIntensity={emissiveIntensity}
              transparent
              opacity={materialOpacity}
            />
          }
          {data.isSun && <pointLight castShadow intensity={15000} distance={1000} />}
        </mesh>
        
        {data.ring && ringTexture && (
          <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
            <ringGeometry args={[data.ring.innerRadius, data.ring.outerRadius, 64]} />
            <meshBasicMaterial map={ringTexture} side={THREE.DoubleSide} transparent opacity={0.9 * materialOpacity} />
          </mesh>
        )}
        
        {data.satellites?.map(satellite => {
          if (satellite.isTogglable && !showAdvancedMoons) {
            return null;
          }
          return (
            <CelestialBody 
                key={satellite.id} 
                data={satellite} 
                onSelect={onSelect} 
                isSelected={isSelected} 
                isAnyBodySelected={isAnyBodySelected}
                onPlayHoverSound={onPlayHoverSound}
                showAdvancedMoons={showAdvancedMoons}
                sunTexture={sunTexture}
            />
          );
        })}
      </group>
    </group>
  );
};

export default CelestialBody;