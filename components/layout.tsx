import React from 'react';
import { useElementScroll } from 'framer-motion';
import { Flex } from '@chakra-ui/react';
import { Footer } from './footer';
import { Header } from './header';

export const Layout = ({ children }) => {
  const scrollRef = React.useRef(null);
  const { scrollYProgress } = useElementScroll(scrollRef);
  return (
    <Flex direction="column" h="100vh">
      <Header scroll={scrollYProgress} />
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'scroll' }}>
        {children}
      </div>
      <Footer />
    </Flex>
  );
};
