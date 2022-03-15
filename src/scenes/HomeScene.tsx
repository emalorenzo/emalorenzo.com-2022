import {
  Box,
  ContactShadows,
  Environment,
  OrbitControls,
  Plane,
  Sky,
} from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { MeshLine, MeshLineMaterial } from 'meshline';
import React, { useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';

extend({ MeshLine, MeshLineMaterial });

function Fatline() {
  const line = useRef<MeshLine>();
  const material = useRef<MeshLineMaterial>();

  // const [color] = useState(() => '#EE786E');
  const [ratio] = useState(() => 0.1 + 0.5 * Math.random());
  const [width] = useState(() => Math.max(0.1, 0.3 * Math.random()));
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

// TODO: usar un array de curvas https://threejs.org/docs/#api/en/extras/core/CurvePath
// en caso de que necesitemos crear un path dinamico
export const HomeScene = () => {
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
      <OrbitControls
        makeDefault
        enableZoom={false}
        autoRotate
        enableRotate={false}
        rotateSpeed={2}
      />
      <Environment
        preset="city" // TODO: replace for lights in prod since it's expensive
      />
      {/* <Sky
        distance={4000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      /> */}
      <color attach="background" args={['#141414']} />
      <fog attach="fog" args={['#141414', 3, 25]} />

      {/* <ambientLight intensity={0.5} color="white" /> */}
      {/* <directionalLight intensity={4} position={[-2, 3, 0]} /> */}
      <gridHelper position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" color="white" />
      </gridHelper>

      <Fatline />
      <group>
        <Box ref={boxRef} position={[0, 2, 0]}>
          <meshStandardMaterial attach="material" color="white" />
        </Box>
        {/* <Plane
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.001, 0]}
          args={[10, 10]}
        >
          <meshStandardMaterial attach="material" />
        </Plane> */}
      </group>
      {/* <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, 0, 0]}
        opacity={0.3}
        width={15}
        height={15}
        blur={1}
        far={5}
        // frames={1}
      /> */}
    </>
  );
};
