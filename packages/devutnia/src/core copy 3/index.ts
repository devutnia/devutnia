import * as http from 'http';
import * as express from 'express';
import * as httpProxy from 'http-proxy';

import { DevutniaHost, DevutniaProxy, DevutniaServer } from './types';

export const createHost: DevutniaHost = (host_setup) => {
  const host = express();

  if (typeof host_setup === 'function') host_setup(host);
  else if (typeof host_setup === 'object') {
    if (host_setup?.config?.routes?.length > 0) {
      host_setup.config.routes.forEach(([path, loader]) => {
        const route = express.Router();
        loader(route);
        host.use(path, route);
      });
    }
  }

  return host;
};

export const createProxy: DevutniaProxy = (proxy_loader, proxy_options) => {
  const proxy = httpProxy.createProxyServer(proxy_options);

  if (proxy_loader) proxy_loader(proxy);

  return proxy;
};

export const createServer: DevutniaServer = ({ host, proxy }, server_options) => {
  const server = http.createServer(server_options, (req, res) => {
    if (host) host(req, res);
    if (proxy) {
      proxy.web(req, res);
      server.addListener('upgrade', proxy.ws);
    }
  });

  return server;
};

const host = createHost({
  loader: (host) => {},
  config: {
    routes: [['/', (route) => {}]],
  },
});
const proxy = createProxy((proxy) => {});

const server = createServer({ host, proxy });
