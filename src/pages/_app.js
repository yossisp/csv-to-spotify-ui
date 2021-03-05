import React, { useEffect } from 'react';
import { Provider } from 'next-auth/client';
import { siteUrl } from 'config';
import { AppContextProvider, Layout } from 'components';

import '../css/styles.css';
import '../css/odometer.css';

const App = ({ Component, pageProps }) => {
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
