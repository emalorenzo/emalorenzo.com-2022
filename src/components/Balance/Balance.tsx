import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { CanvasLayout, DomLayout } from '@/layouts';
import { splitArray } from '@/lib/helpers';
import { useStore } from '@/lib/store';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const Balance = ({ child }) => {
  // separa los nodos de children en dos arreglos,
  // los que contienen la prop "r3f" y los que no
  const [r3f, dom] = splitArray(child, (c) => c.props.r3f === true);

  const ref = useRef(null);

  useEffect(() => {
    useStore.setState({ dom: ref });
  }, []);

  return (
    <Wrapper ref={ref}>
      <DomLayout>{dom}</DomLayout>
      <CanvasLayout>{r3f}</CanvasLayout>
    </Wrapper>
  );
};
