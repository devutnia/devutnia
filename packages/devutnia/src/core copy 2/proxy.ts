import * as httpProxy from 'http-proxy';

export class DevutniaProxy extends httpProxy {
  constructor(options?: httpProxy.ServerOptions, loader?: (proxy: httpProxy) => void) {
    super(options);
    if (loader) loader(this);
  }
}
