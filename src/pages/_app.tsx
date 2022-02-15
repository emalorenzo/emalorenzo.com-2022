import type { AppProps } from 'next/app';
import { AnimateSharedLayout } from 'framer-motion';

import { Layout, GlobalStyles } from '@/components';
import { HeaderProvider } from '@/context';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <HeaderProvider>
        <AnimateSharedLayout>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AnimateSharedLayout>
      </HeaderProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
