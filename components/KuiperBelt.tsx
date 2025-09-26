/// <reference types="@react-three/fiber" />

import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const KuiperBelt: React.FC = () => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null!);
  const count = 2000;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!instancedMeshRef.current) return;

    const innerRadius = 160;
    const outerRadius = 220;
    const height = 5; // A thicker, more dispersed belt

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = THREE.MathUtils.randFloat(innerRadius, outerRadius);
      const inclination = THREE.MathUtils.randFloat(-0.2, 0.2); // slight inclination variation
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle) * radius * inclination + THREE.MathUtils.randFloat(-height, height);
      
      dummy.position.set(x, y, z);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      
      const scale = THREE.MathUtils.randFloat(0.1, 0.3);
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    }
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);
  
  useFrame(() => {
      if(instancedMeshRef.current) {
          instancedMeshRef.current.rotation.y += 0.00005;
      }
  });

  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color="#a0c0ff" roughness={0.6} metalness={0.1} emissive="#a0c0ff" emissiveIntensity={0.1} />
    </instancedMesh>
  );
};

export default KuiperBelt;
