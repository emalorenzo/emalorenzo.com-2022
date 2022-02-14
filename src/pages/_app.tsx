import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimateSharedLayout } from 'framer-motion';

import { theme } from '@/theme';
import { Layout } from '@/components';
import { HeaderProvider } from '@/context';

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
