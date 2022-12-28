import * as express from 'express';

import * as T from './types';

export class DevutniaHost implements T.ServerListener {
  listener = express();

  constructor(setup?: (host: T.HostSetup<DevutniaHost>) => void) {
    this.addRoute = this.addRoute.bind(this);
    this.addMiddleware = this.addMiddleware.bind(this);

    if (setup) {
      setup({
        addRoute: this.addRoute,
        addMiddleware: this.addMiddleware,
      });
    }
  }

  addMiddleware(handler: express.RequestHandler) {
    this.listener.use(handler);
    return this;
  }

  addRoute(
    path: string,
    handler: (
      route: express.Router,
      packet: { req: express.Request; res: express.Response }
    ) => void
  ) {
    const route = express.Router();
    this.listener.use(path, (req, res, next) => {
      handler(route, { req, res });
      route(req, res, next);
    });
    return this;
  }
}
