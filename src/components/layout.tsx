import React from 'react';
import { useElementScroll } from 'framer-motion';
import styled from 'styled-components';

import { Header } from './header';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  background-color: var(--primary-color);
  color: var(--color);
  padding: 32px;
`;

export const Layout = ({ children }) => {
  const scrollRef = React.useRef(null);
  const { scrollYProgress } = useElementScroll(scrollRef);
  return (
    <Wrapper>
      {/* <Header scroll={scrollYProgress} /> */}
      <Content ref={scrollRef}>{children}</Content>
      {/* <Footer>Ema Lorenzo</Footer> */}
    </Wrapper>
  );
};
