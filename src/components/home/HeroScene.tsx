"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Single floating product card in 3D ---------- */
function ProductPlane({
  imageUrl,
  position,
  rotation,
  scale = 1,
}: {
  imageUrl: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  // Slight continuous rotation
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y =
      rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    meshRef.current.rotation.x =
      rotation[0] + Math.cos(state.clock.elapsedTime * 0.2) * 0.03;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[1.6, 2.2]} />
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
    </Float>
  );
}

/* ---------- Cursor-parallax camera rig ---------- */
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    // Subtle camera movement following cursor
    camera.position.x += (state.pointer.x * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (state.pointer.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ---------- Ambient floating particles ---------- */
function FloatingParticles({ count = 30 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#D9A857"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* ---------- Main Hero Scene ---------- */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-3, 2, 4]} intensity={0.4} color="#E3A62F" />

          <CameraRig />
          <FloatingParticles count={25} />

          {/* Product packs floating in space */}
          <ProductPlane
            imageUrl="/products/ribbon-pakoda.jpg"
            position={[-2.2, 0.3, 0]}
            rotation={[0, 0.15, -0.05]}
            scale={0.9}
          />
          <ProductPlane
            imageUrl="/products/potato-chips.jpg"
            position={[0, 0.5, 0.5]}
            rotation={[0, -0.1, 0.03]}
            scale={1.1}
          />
          <ProductPlane
            imageUrl="/products/murukku.jpg"
            position={[2.3, -0.2, -0.3]}
            rotation={[0, 0.2, 0.05]}
            scale={0.85}
          />
          <ProductPlane
            imageUrl="/products/masala-chips.jpg"
            position={[-1, -1.5, -1]}
            rotation={[0.1, -0.15, -0.08]}
            scale={0.7}
          />
          <ProductPlane
            imageUrl="/products/omapodi.jpg"
            position={[1.5, 1.2, -0.8]}
            rotation={[-0.05, 0.1, 0.1]}
            scale={0.75}
          />

          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
