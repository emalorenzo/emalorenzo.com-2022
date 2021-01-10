import { Flex } from '@chakra-ui/react';
import { Footer } from './footer';
import { Header } from './header';

export const Layout = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex overflowY="scroll" flex={1} bg="yellow.300">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};
