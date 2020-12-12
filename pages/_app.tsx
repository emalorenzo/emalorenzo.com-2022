import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimateSharedLayout } from 'framer-motion';
import { theme } from 'theme';

import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </ChakraProvider>
  );
};

export default App;
