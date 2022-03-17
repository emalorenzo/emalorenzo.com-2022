import { Canvas } from '@react-three/fiber';
import React from 'react';

export const CanvasLayout = ({ children }) => {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 90, position: [-8, 6, 5] }}>
      {children}
    </Canvas>
  );
};
