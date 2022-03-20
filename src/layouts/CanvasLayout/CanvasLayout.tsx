import { OrbitControls, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

import { useStore } from '@/lib/store';

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

export const CanvasLayout = ({ children }) => {
  const dom = useStore((state) => state.dom);

  return (
    <Canvas
      mode="concurrent"
      style={{
        position: 'absolute',
        top: 0,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
      // test
      dpr={[1, 2]}
      camera={{ fov: 90, position: [-8, 6, 5] }}
    >
      <Control />
      <Preload all />
      {children}
    </Canvas>
  );
};
