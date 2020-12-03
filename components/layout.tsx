import { Flex } from '@chakra-ui/react';
import { Footer } from './footer';
import { PreviewAlert } from './previewAlert';

export const Layout = ({ preview, children }) => (
  <Flex direction="column" minH="100vh">
    {preview && <PreviewAlert />}
    <main>{children}</main>
    <Footer />
  </Flex>
);
