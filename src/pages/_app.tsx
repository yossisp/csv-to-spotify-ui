import React, { ReactChild } from 'react';
import { Provider } from 'next-auth/client';
import { siteUrl } from 'config';
import { AppContextProvider, Layout } from 'components';
import { AppProps } from 'next/app';

import '../css/styles.css';
import '../css/odometer.css';

interface Props {
  /**
   * Page route to render.
   */
  Component: ReactChild;
  /**
   * Next.js props.
   */
  pageProps: AppProps;
}

/**
 * Passes next.js pageProps to child page.
 * @returns React component.
 */
const App: React.FC<Props> = ({ Component, pageProps }) => {
  const { session } = pageProps;
  console.log('_app session', session);

  return (
    <Provider options={{ site: siteUrl }} session={session}>
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </Provider>
  );
};

export default App;
