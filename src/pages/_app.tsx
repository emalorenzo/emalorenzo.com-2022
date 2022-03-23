import { AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Balance, GlobalStyles, Head } from '@/components';
import { HeaderProvider } from '@/context';
import { useStore } from '@/lib/store';
import type { AppPropsWithLayout } from '@/types';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();

  useEffect(() => {
    useStore.setState({ router });
  }, [router]);

  // @ts-ignore
  const child = Component(pageProps).props.children;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      <Head title={pageProps.title} />
      <GlobalStyles />
      <HeaderProvider>
        <AnimateSharedLayout>
          <Balance child={child} />
        </AnimateSharedLayout>
      </HeaderProvider>
    </>
  );
};

export default App;
