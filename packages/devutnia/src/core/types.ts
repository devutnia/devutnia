import * as http from 'http';
import * as express from 'express';
import * as Proxy from 'http-proxy';

export type Request = typeof http.IncomingMessage;
export type Response = typeof http.ServerResponse;

export type ProxyLoader = (proxy: Proxy) => void;
export interface DevutniaProxySetup {
  options?: Proxy.ServerOptions;
}

export interface DevutniaProxy {
  <Setup extends DevutniaProxySetup>(setup?: Setup): Proxy;
  <Loader extends ProxyLoader>(loader?: Loader): Proxy;
  (setup?: DevutniaProxySetup, loader?: ProxyLoader): Proxy;
}

export type HostLoader = (host: express.Express) => void;
export type HostRouteHandler = (route: express.Router) => void;
export type HostRoute =
  | HostRouteHandler
  | { handler: HostRouteHandler; options?: express.RouterOptions };

export interface DevutniaHostSetup {
  routes?: Record<`/${string}`, HostRoute>;
}

export interface DevutniaHost {
  <Setup extends DevutniaHostSetup>(setup?: Setup): express.Express;
  <Loader extends HostLoader>(loader?: Loader): express.Express;
  (setup?: DevutniaHostSetup, loader?: HostLoader): express.Express;
}

export type ServerLoader<
  Req extends Request = Request,
  Res extends Response = Response
> = (server: http.Server<Req, Res>) => void;
export interface DevutniaServerSetup {
  host: ReturnType<DevutniaHost>;
  proxy?: ReturnType<DevutniaProxy>;
  options?: http.ServerOptions;
}

export interface DevutniaServer {
  <Req extends Request = Request, Res extends Response = Response>(
    setup: DevutniaServerSetup,
    loader?: ServerLoader<Req, Res>
  ): http.Server<Req, Res>;
}

export interface DevutniaConfig {
  host?: Partial<DevutniaHostSetup>;
  proxy?: Partial<DevutniaProxySetup>;
  server?: http.ServerOptions;
}

export interface DevutniaInterface {
  addRoute: (
    path: keyof DevutniaConfig['host']['routes'],
    route: HostRoute
  ) => DevutniaInterface;
  start: () => void;
}
export interface Devutnia {
  <Config extends DevutniaConfig>(config?: Config): DevutniaInterface;
  <Loader extends (devutnia: DevutniaInterface) => void>(
    loader?: Loader
  ): DevutniaInterface;
  (
    config?: DevutniaConfig,
    loader?: (devutnia: DevutniaInterface) => void
  ): DevutniaInterface;
}

export interface DevutniaBackend {
  (): {
    host: (loader?: HostLoader) => express.Express;
    proxy: (loader?: ProxyLoader) => Proxy;
    server: <Req extends Request = Request, Res extends Response = Response>(
      setup: DevutniaServerSetup,
      loader?: ServerLoader<Req, Res>
    ) => http.Server;
  };
}
