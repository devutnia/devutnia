import * as express from 'express';

import { DevutniaHost } from '../types';

export const createHost: DevutniaHost = (...args) => {
  const host = express();

  if (typeof args[0] === 'function') args[0](host);
  else if (typeof args[0] === 'object') {
    if (args[0]?.routes) {
      Object.entries(args[0].routes).forEach(([path, loader]) => {
        let route = express.Router();
        if (typeof loader === 'function') loader(route);
        else if (typeof loader === 'object') {
          route = express.Router(loader['options']);
          loader['handler'](route);
        }
        host.use(path, route);
      });
    }
  }

  if (typeof args[1] === 'function') args[1](host);

  return host;
};

export { DevutniaHost };
