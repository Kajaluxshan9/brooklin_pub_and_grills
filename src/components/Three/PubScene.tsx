import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export const AnimatedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float
      speed={1.4} // Animation speed
      rotationIntensity={1} // XYZ rotation intensity
      floatIntensity={2} // Up/down float intensity
      floatingRange={[-0.1, 0.1]} // Floating range
    >
      <Sphere ref={meshRef} visible args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#8B4513"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
};

export const FloatingCubes: React.FC = () => {
  const cubes = Array.from({ length: 5 }, (_, i) => (
    <Float
      key={i}
      speed={1 + Math.random()}
      rotationIntensity={0.5 + Math.random() * 0.5}
      floatIntensity={1 + Math.random()}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh
        position={[
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
        ]}
      >
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.8}
          roughness={0.2}
          opacity={0.7}
          transparent
        />
      </mesh>
    </Float>
  ));

  return <>{cubes}</>;
};

export const PubScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 1]} intensity={1} />
      <pointLight position={[-3, -2, -1]} intensity={0.5} color="#D4AF37" />
      <AnimatedSphere />
      <FloatingCubes />
    </>
  );
};
