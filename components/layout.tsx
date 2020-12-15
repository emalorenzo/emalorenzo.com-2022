import { Flex } from '@chakra-ui/react';
import { Footer } from './footer';
import { Header } from './header';

export const Layout = ({ children }) => (
  <Flex direction="column" height="100vh">
    <Header />
    {children}
    <Footer />
  </Flex>
);
