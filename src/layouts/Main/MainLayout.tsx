import { motion } from 'framer-motion';
import type { TransitionDefinition } from 'framer-motion/types/types';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 300;

  a {
    color: white;
  }
`;

const Logo = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const Line = styled(motion.div)`
  bottom: 0px;
  left: 0;
  position: absolute;
  height: 2px;
  background: white;
  width: 0%;
  transition: width 0.2s ease-in-out;

  ${Logo}:hover & {
    width: 100%;
  }
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

const transition: TransitionDefinition = {
  duration: 3,
  repeat: false,
};

export const MainLayout = ({ children }) => {
  const scrollRef = React.useRef(null);
  const year = new Date().getFullYear();
  return (
    <Wrapper>
      <Header>
        <Link href="/" passHref>
          <a>
            <Logo>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-home"
              >
                <motion.path
                  d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={transition}
                />
                <motion.polyline
                  points="9 22 9 12 15 12 15 22"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={transition}
                />
              </svg>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="70px"
                height="22px"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{
                  fillOpacity: 0,
                }}
                animate={{ fill: 'white', fillOpacity: 1 }}
                transition={{ delay: 1.7, duration: 1 }}
                style={{ marginLeft: '0.4em', marginRight: '0.2em' }}
              >
                <motion.text
                  x="50%"
                  y="66%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  initial={{
                    strokeDasharray: 160,
                    strokeDashoffset: 160,
                  }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={transition}
                >
                  Emanuel
                </motion.text>
              </motion.svg>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="61"
                height="22px"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{
                  fillOpacity: 0,
                }}
                animate={{ fill: 'white', fillOpacity: 1 }}
                transition={{ delay: 1.7, duration: 1 }}
              >
                <motion.text
                  x="50%"
                  y="66%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  initial={{
                    strokeDasharray: 160,
                    strokeDashoffset: 160,
                  }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={transition}
                >
                  Lorenzo
                </motion.text>
              </motion.svg>
              <Line />
            </Logo>
          </a>
        </Link>
      </Header>
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
            transition={transition}
          />
        </svg>
      </Footer>
    </Wrapper>
  );
};
