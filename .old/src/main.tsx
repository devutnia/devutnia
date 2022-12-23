import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

import { MotifProvider, SupabaseProvider } from './providers';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <SupabaseProvider>
      <MotifProvider
        globalStyles={{
          '*': { boxSizing: 'border-box' },
          body: { margin: 0, padding: 0 },
        }}
      >
        <App />
      </MotifProvider>
    </SupabaseProvider>
  </StrictMode>
);
