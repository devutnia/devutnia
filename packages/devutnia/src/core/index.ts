import * as http from 'http';
import * as express from 'express';
import { createProxyServer } from 'http-proxy';

import { DevutniaHost, DevutniaProxy, DevutniaServer } from './types';

const createHost: DevutniaHost = (...args) => {
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

const createProxy: DevutniaProxy = (...args) => {
  let proxy = createProxyServer();

  if (typeof args[0] === 'function') args[0](proxy);
  else if (typeof args[0] === 'object') proxy = createProxyServer(args[0]?.options);

  if (typeof args[1] === 'function') args[1](proxy);

  return proxy;
};

const createServer: DevutniaServer = ({ host, proxy, options }, loader) => {
  if (!host) throw Error('The host application was not provided to the server!');

  const server = http.createServer(options, (req, res) => {
    host(req, res);
    if (proxy) {
      proxy.web(req, res);
      server.addListener('upgrade', proxy.ws);
    }
  });

  if (typeof loader === 'function') loader(server);

  return server;
};

const host = createHost();
const proxy = createProxy();
const server = createServer({ host, proxy });
