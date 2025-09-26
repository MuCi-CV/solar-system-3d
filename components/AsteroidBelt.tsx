/// <reference types="@react-three/fiber" />

import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const AsteroidBelt: React.FC = () => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null!);
  const count = 1500;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!instancedMeshRef.current) return;

    const innerRadius = 50;
    const outerRadius = 68;
    const height = 1.5;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = THREE.MathUtils.randFloat(innerRadius, outerRadius);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = THREE.MathUtils.randFloat(-height, height);
      
      dummy.position.set(x, y, z);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      
      const scale = THREE.MathUtils.randFloat(0.05, 0.2);
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    }
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);
  
  // Slowly rotate the entire belt for a dynamic effect
  useFrame(() => {
      if(instancedMeshRef.current) {
          instancedMeshRef.current.rotation.y += 0.0001;
      }
  });

  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color="#5c4d41" roughness={0.8} metalness={0.2} />
    </instancedMesh>
  );
};

export default AsteroidBelt;
