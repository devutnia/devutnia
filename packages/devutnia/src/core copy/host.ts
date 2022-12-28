import * as express from 'express';

export class DevutniaHost {
  listener = express();

  addRoute(path: string, handler: (req: express.Request, res: express.Response) => void) {
    const route = express.Router();

    this.listener.use(path, (req, res, next) => {
      handler(req, res);
      route(req, res, next);
    });
  }
}
