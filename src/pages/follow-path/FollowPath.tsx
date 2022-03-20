import {
  Box,
  ContactShadows,
  Environment,
  OrbitControls,
  Plane,
  Sky,
} from '@react-three/drei';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { MeshLine, MeshLineMaterial } from 'meshline';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';

import { MainLayout } from '@/layouts';

extend({ MeshLine, MeshLineMaterial });

function MeshCurve() {
  const line = useRef<MeshLine>();
  const material = useRef<MeshLineMaterial>();

  const [ratio] = useState(() => 0.1 + 0.5 * Math.random());
  // Calculate wiggly curve
  const [curve] = useState(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 2, 0),
      new THREE.Vector3(-2, 4, 2),
      new THREE.Vector3(0, 1, -3),
      new THREE.Vector3(5, 3, -1),
      new THREE.Vector3(6, 2, 0),
    ]).getPoints(50);
  });
  // Mave the curve forward allong the path
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

const Scene = () => {
  const speed = 0.2;
  const boxRef = React.useRef<THREE.Mesh>(null!);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-5, 2, 0),
    new THREE.Vector3(-2, 4, 2),
    new THREE.Vector3(0, 1, -3),
    new THREE.Vector3(5, 3, -1),
    new THREE.Vector3(6, 2, 0),
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
  return (
    <>
      <Environment preset="city" />
      <gridHelper position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" color="white" />
      </gridHelper>
      <MeshCurve />
      <group>
        <Box ref={boxRef} position={[0, 2, 0]}>
          <meshStandardMaterial attach="material" color="white" />
          <arrowHelper />
        </Box>
      </group>
      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, 0, 0]}
        opacity={0.3}
        width={15}
        height={15}
        blur={1}
        far={5}
      />
    </>
  );
};

const FollowPath = () => {
  return (
    <>
      <h1>Follow Path</h1>
      {/* @ts-ignore */}
      <Scene r3f />
    </>
  );
};

FollowPath.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default FollowPath;
