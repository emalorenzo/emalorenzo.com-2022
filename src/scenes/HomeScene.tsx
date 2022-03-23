import { Box, Environment, OrbitControls } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { MeshLine, MeshLineMaterial } from 'meshline';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { useStore } from '@/lib/store';
import type { Scene } from '@/types';

extend({ MeshLine, MeshLineMaterial });

const Control = () => {
  const dom = useStore((state) => state.dom);
  const control = useRef(null);

  useEffect(() => {
    // desabilita el zoom y panning en mobile para dejar
    // lugar a OrbitControls
    if (control) {
      dom.current.style['touch-action'] = 'none';
    }
  }, [dom, control]);
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />;
};

function Fatline() {
  const line = useRef<MeshLine>();
  const material = useRef<MeshLineMaterial>();

  const [ratio] = useState(() => 0.1 + 0.5 * Math.random());

  // Calculate wiggly curve
  const [curve] = useState(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0, -2.7),
      new THREE.Vector3(-5, 0, -2.7),
      new THREE.Vector3(0, 0, -2.7),
      new THREE.Vector3(5, 0, -2.7),
      new THREE.Vector3(10, 0, -2.7),
    ]).getPoints(50);
  });
  // Hook into the render loop and decrease the materials dash-offset
  useFrame(() => {
    material.current.uniforms.dashOffset.value -= 0.001;
  });

  return (
    <mesh>
      {/* @ts-ignore */}
      <meshLine ref={line} attach="geometry" points={curve} />
      {/* @ts-ignore */}
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest
        lineWidth={0.1}
        color="#EE786E"
        dashArray={0.1}
        dashRatio={ratio}
      />
    </mesh>
  );
}

export const HomeScene: Scene = () => {
  const speed = 0.08;
  const boxRef = React.useRef<THREE.Mesh>(null!);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, 0, -2.7),
    new THREE.Vector3(-5, 0, -2.7),
    new THREE.Vector3(0, 0, -2.7),
    new THREE.Vector3(5, 0, -2.7),
    new THREE.Vector3(10, 0, -2.7),
  ]);

  useFrame(({ clock }) => {
    boxRef.current.rotation.y += 0.004;
    boxRef.current.rotation.x += 0.004;
    boxRef.current.rotation.z += 0.004;

    const point = curve.getPoint((clock.getElapsedTime() * speed) % 1);
    boxRef.current.position.x = point.x;
    boxRef.current.position.y = point.y;
    boxRef.current.position.z = point.z;
  });

  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* <OrbitControls
        makeDefault
        // enableZoom={false}
        // autoRotate
        // enableRotate={false}
        // rotateSpeed={2}
      /> */}
      <Environment
        preset="city" // TODO: replace for lights in prod since it's expensive
      />
      {/* <color attach="background" args={['#141414']} /> */}
      <fog attach="fog" args={['#141414', 3, 25]} />

      <Fatline />
      <Box
        ref={boxRef}
        position={[0, 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          attach="material"
          color={hovered ? 'hotpink' : 'white'}
        />
      </Box>
    </>
  );
};
