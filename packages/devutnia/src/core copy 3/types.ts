import * as http from 'http';
import * as express from 'express';
import * as Proxy from 'http-proxy';

export type Request = typeof http.IncomingMessage;
export type Response = typeof http.ServerResponse;

export interface DevutniaConveyor {
  convey: (req: Request, res: Response) => void;
}

export interface DevutniaHostSetup {
  routes: Record<`/${string}`, (route: express.Router) => void>;
}

export interface DevutniaHost {
  <
    Setup extends {
      loader?: (host: express.Express) => void;
      config?: {
        routes?: [path: `/${string}`, loader: (route: express.Router) => void][];
      };
    }
  >(
    setup?: Setup
  ): express.Express;

  <Setup extends (host: express.Express) => void>(setup?: Setup): express.Express;
}

export interface DevutniaProxy {
  (proxy_loader?: (proxy: Proxy) => void, proxy_options?: Proxy.ServerOptions): Proxy;
}

export interface DevutniaServerSetup {
  host: ReturnType<DevutniaHost>;
  proxy?: ReturnType<DevutniaProxy>;
}

export interface DevutniaServer {
  <Req extends Request = Request, Res extends Response = Response>(
    server_setup?: DevutniaServerSetup,
    server_options?: http.ServerOptions
  ): http.Server<Req, Res>;
}
