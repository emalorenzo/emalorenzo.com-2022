import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimateSharedLayout } from 'framer-motion';

import { Layout } from 'components';
import { HeaderProvider } from 'context';
import { theme } from 'theme';

import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      {/* shares blog / snippet / history title to header */}
      <HeaderProvider>
        <AnimateSharedLayout>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AnimateSharedLayout>
      </HeaderProvider>
    </ChakraProvider>
  );
};

export default App;
