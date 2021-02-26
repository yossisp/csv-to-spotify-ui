import React from 'react';
import { Provider } from 'next-auth/client';
import { siteUrl } from 'config';
import { AppContextProvider } from 'components';
import '../styles.css';

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;

  return (
    <Provider options={{ site: siteUrl }} session={session}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </Provider>
  );
};

export default App;
