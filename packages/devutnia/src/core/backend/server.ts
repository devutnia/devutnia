import * as http from 'http';

import { DevutniaServer } from '../types';

export const createServer: DevutniaServer = ({ host, proxy, options }, loader) => {
  if (!host) throw Error('The host application was not provided to the server!');

  const server = http.createServer(options, (req, res) => {
    host(req, res);
    if (proxy) proxy.web(req, res);
  });

  if (typeof loader === 'function') loader(server);

  if (proxy) server.addListener('upgrade', proxy.ws);

  return server;
};

export { DevutniaServer };
