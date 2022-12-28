import * as http from 'http';
import * as express from 'express';
import * as Proxy from 'http-proxy';

export type Request = typeof http.IncomingMessage;
export type Response = typeof http.ServerResponse;

export interface DevutniaProxySetup {
  options?: Proxy.ServerOptions;
}

export interface DevutniaProxy {
  <Setup extends DevutniaProxySetup>(setup?: Setup): Proxy;
  <Loader extends (proxy: Proxy) => void>(loader?: Loader): Proxy;
  (setup?: DevutniaProxySetup, loader?: (proxy: Proxy) => void): Proxy;
}

export type HostRouteHandler = (route: express.Router) => void;
export type HostRoute =
  | HostRouteHandler
  | { handler: HostRouteHandler; options?: express.RouterOptions };

export interface DevutniaHostSetup {
  routes?: Record<`/${string}`, HostRoute>;
}

export interface DevutniaHost {
  <Setup extends DevutniaHostSetup>(setup?: Setup): express.Express;
  <Loader extends (host: express.Express) => void>(loader?: Loader): express.Express;
  (setup?: DevutniaHostSetup, loader?: (host: express.Express) => void): express.Express;
}

export interface DevutniaServerSetup {
  host: ReturnType<DevutniaHost>;
  proxy?: ReturnType<DevutniaProxy>;
  options?: http.ServerOptions;
}

export interface DevutniaServer {
  <Req extends Request = Request, Res extends Response = Response>(
    setup: DevutniaServerSetup,
    loader?: (server: http.Server<Req, Res>) => void
  ): http.Server<Req, Res>;
}
