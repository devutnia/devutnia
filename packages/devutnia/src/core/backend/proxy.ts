import * as Proxy from 'http-proxy';

import { DevutniaProxy } from '../types';

export const createProxy: DevutniaProxy = (..._) => {
  let proxy = Proxy.createProxyServer();

  if (typeof _[0] === 'function') _[0](proxy);
  else if (typeof _[0] === 'object') proxy = Proxy.createProxyServer(_[0]?.options);

  if (typeof _[1] === 'function') _[1](proxy);

  return proxy;
};

export { DevutniaProxy };
