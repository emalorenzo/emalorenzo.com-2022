import { AnimatePresence, motion } from 'framer-motion';
import type { TransitionDefinition } from 'framer-motion/types/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  position: fixed;
  z-index: 2;
  mix-blend-mode: difference;
  top: 0;
  left: 0;
  padding: 0.7rem;
  font-size: 1rem;
  font-weight: 300;

  a {
    color: white;
  }
`;

const LogoWrapper = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.3rem 0;
  margin: 0 0.3rem;
  overflow: hidden;
  height: 1.5rem;
  width: ${({ roomForIcon }) => (roomForIcon ? '120px' : '100px')};
  transition: width 0.5s ease-in-out;
  transition-delay: ${({ roomForIcon }) => (roomForIcon ? '0s' : '0.7s')};
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

const Door = styled(motion.polyline)`
  fill-opacity: 0;
  transition: fill-opacity 0.3s ease-in-out;
  /* margin-bottom: -2px; */

  ${LogoWrapper}:hover & {
    fill-opacity: 1;
  }
`;

const SVGText = styled.span`
  position: absolute;
  left: ${({ roomForIcon }) => (roomForIcon ? 'calc(18px + 0.2em)' : '0')};
  height: 100%;
  display: flex;
  transition: left 0.5s ease-in-out;
  transition-delay: ${({ roomForIcon }) => (roomForIcon ? '0s' : '0.7s')};
`;

const Line = styled(motion.div)`
  bottom: 0px;
  left: 0;
  position: absolute;
  height: 2px;
  background: white;
  width: 0%;
  transition: width 0.2s ease-in-out;

  ${LogoWrapper}:hover & {
    width: 100%;
  }
`;

const SVGTransition: TransitionDefinition = {
  duration: 3,
  repeat: false,
};

export const Header = () => {
  const { asPath } = useRouter();

  return (
    <Wrapper>
      <Link href="/" passHref>
        <a>
          <LogoWrapper roomForIcon={asPath !== '/'}>
            <AnimatePresence>
              {asPath !== '/' && (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ y: '120%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '150%' }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.path
                    d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={SVGTransition}
                  />
                  <Door
                    points="9 22 9 12 15 12 15 22"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={SVGTransition}
                    fill="white"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
            <SVGText roomForIcon={asPath !== '/'}>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
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
                  x="53%"
                  y="66%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  initial={{
                    strokeDasharray: 160,
                    strokeDashoffset: 160,
                  }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={SVGTransition}
                >
                  ema
                </motion.text>
              </motion.svg>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="61"
                height="22px"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{
                  fillOpacity: 0,
                }}
                animate={{ fill: 'currentColor', fillOpacity: 1 }}
                transition={{ delay: 1.7, duration: 1 }}
              >
                <motion.text
                  x="47%"
                  y="66%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  initial={{
                    strokeDasharray: 160,
                    strokeDashoffset: 160,
                  }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={SVGTransition}
                >
                  lorenzo
                </motion.text>
              </motion.svg>
            </SVGText>
            <Line />
          </LogoWrapper>
        </a>
      </Link>
    </Wrapper>
  );
};
