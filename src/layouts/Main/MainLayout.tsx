import { motion } from 'framer-motion';
import type { TransitionDefinition } from 'framer-motion/types/types';
import React from 'react';
import styled from 'styled-components';

import { Header } from '@/components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 32px;
  display: flex;
  justify-content: space-between;
`;

const SVGTransition: TransitionDefinition = {
  duration: 3,
  repeat: false,
};

export const MainLayout = ({ children }) => {
  const scrollRef = React.useRef(null);
  const year = new Date().getFullYear();
  return (
    <Wrapper>
      <Header />
      <Content ref={scrollRef}>{children}</Content>
      <Footer>
        {`© ${year}, Emanuel Lorenzo. Enjoy the journey`}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={SVGTransition}
          />
        </svg>
      </Footer>
    </Wrapper>
  );
};
