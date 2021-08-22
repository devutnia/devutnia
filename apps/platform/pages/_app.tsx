import { AppProps } from 'next/app';
import Head from 'next/head';

import LumbyProvider from '@devutnia/lumby';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <LumbyProvider>
      <Head>
        <title>Welcome to platform!</title>
      </Head>
      <div className="app">
        <header className="flex">
          <h1>Welcome to platform!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </LumbyProvider>
  );
}

export default CustomApp;
