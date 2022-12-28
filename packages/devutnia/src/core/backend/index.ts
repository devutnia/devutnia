export * from './server';
export * from './proxy';
export * from './host';

import * as back from '../backend';
import { DevutniaConfig, DevutniaBackend } from '../types';

export const createBackend: DevutniaBackend = () => {
  const config: DevutniaConfig = {
    host: {
      routes: {
        '/': (route) => route.get('/', (_, res) => res.send(`<div>Henlo</div>`)),
      },
    },
  };

  return {
    host: (loader) => back.createHost(config.host, loader),
    proxy: (loader) => back.createProxy(config.proxy, loader),
    server: (setup, loader) => {
      return back.createServer(
        Object.assign({ ...setup }, { server: config.server }),
        loader
      );
    },
  };
};
