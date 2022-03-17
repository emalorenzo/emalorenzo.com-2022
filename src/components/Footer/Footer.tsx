import { motion } from 'framer-motion';
import type { TransitionDefinition } from 'framer-motion/types/types';
import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.footer`
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 32px;
  display: flex;
  justify-content: space-between;

  p {
    font-size: 0.8rem;
  }
`;

const SocialWrapper = styled.div`
  display: flex;
  gap: 2rem;

  a {
    color: currentColor;
  }
`;

const SVGTransition: TransitionDefinition = {
  duration: 3,
  repeat: false,
};

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Wrapper>
      <p>{`© ${year}, Emanuel Lorenzo. Enjoy the journey.`}</p>
      <SocialWrapper>
        <Link href="https://twitter.com/emalorenzo_" passHref>
          <a>
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
                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={SVGTransition}
              />
            </svg>
          </a>
        </Link>
        <Link href="https://github.com/emaLorenzo" passHref>
          <a>
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
          </a>
        </Link>
      </SocialWrapper>
    </Wrapper>
  );
};
