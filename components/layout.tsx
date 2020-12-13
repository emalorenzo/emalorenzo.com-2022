import { Flex } from '@chakra-ui/react';
import { Footer } from './footer';
import { Header } from './header';
import { PreviewAlert } from './previewAlert';

export const Layout = ({ preview, children }) => (
  <Flex direction="column" minH="100vh">
    {preview && <PreviewAlert />}
    <Header />
    <Flex as="main" mt="77px">
      {children}
    </Flex>
    <Footer />
  </Flex>
);
