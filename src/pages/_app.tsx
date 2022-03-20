import { AnimateSharedLayout } from 'framer-motion';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';

import { GlobalStyles } from '@/components';
import { HeaderProvider } from '@/context';
import { CanvasLayout, DomLayout } from '@/layouts';
import { splitArray } from '@/lib/helpers';
import { useStore } from '@/lib/store';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Balance = ({ child }) => {
  // separa los nodos de children en dos arreglos,
  // los que contienen la prop "r3f" y los que no
  const [r3f, dom] = splitArray(child, (c) => c.props.r3f === true);

  return (
    <>
      <DomLayout>{dom}</DomLayout>
      <CanvasLayout>{r3f}</CanvasLayout>
    </>
  );
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();

  useEffect(() => {
    useStore.setState({ router });
  }, [router]);

  // array con todos los nodos dentro de children
  // @ts-ignore
  const child = Component(pageProps).props.children;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      <HeaderProvider>
        <AnimateSharedLayout>
          {child && child.length > 1 ? (
            // @ts-ignore
            <Balance child={Component(pageProps).props.children} />
          ) : (
            <Component {...pageProps} />
          )}
        </AnimateSharedLayout>
      </HeaderProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
