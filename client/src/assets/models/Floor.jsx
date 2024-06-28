import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Floor() {
  // Custom shadow material
  const shadowMaterial = useMemo(() => new THREE.ShadowMaterial({ opacity: 0.5 }), []);

  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <circleGeometry args={[10, 32]} />
      <primitive attach="material" object={shadowMaterial} />
    </mesh>
  );
}
