import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Halo() {
  const haloRef = useRef();

  useFrame(() => {
    haloRef.current.scale.x = haloRef.current.scale.y = haloRef.current.scale.z = 0.80;
  });

  return (
    <mesh ref={haloRef}>
      <sphereGeometry args={[2.2, 32, 32]} />
      <meshBasicMaterial color={new THREE.Color(0xffffff)} transparent opacity={0.08} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

export default Halo;