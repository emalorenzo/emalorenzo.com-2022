import {
  Box,
  ContactShadows,
  Environment,
  OrbitControls,
  Plane,
  Sky,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

import { MainLayout } from '@/layouts';

const Scene = () => {
  const boxRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    boxRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5 + 2;

    boxRef.current.rotation.y += 0.004;
    boxRef.current.rotation.x += 0.004;
    boxRef.current.rotation.z += 0.004;
  });

  return (
    <>
      <Box ref={boxRef} position={[0, 2, 0]}>
        <meshStandardMaterial attach="material" color="white" />
        <arrowHelper />
      </Box>
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

const BasicScene = () => {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 90, position: [-3, 10, 5] }}>
      <OrbitControls makeDefault />
      <Environment preset="city" />
      <Sky
        distance={4000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <gridHelper position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" color="white" />
      </gridHelper>
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.001, 0]}
        args={[10, 10]}
      >
        <meshStandardMaterial attach="material" />
      </Plane>

      <Scene />
    </Canvas>
  );
};

BasicScene.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default BasicScene;
