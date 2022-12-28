import * as http from 'http';
import * as express from 'express';

import { Socket } from 'node:net';
import { Duplex } from 'node:stream';

export type ServerRequest = typeof http.IncomingMessage;
export type ServerResponse = typeof http.ServerResponse;
export type ServerTriggers = 'on' | 'off' | 'once';
export interface ServerListener {
  listener: (req: http.IncomingMessage, res: http.ServerResponse) => void;
}
export type ServerEventName<Name extends keyof ServerEventsMap> =
  `${ServerTriggers}:${Name}`;

export type ServerEventsMap = {
  close: () => void;
  listening: () => void;
  error: (err: Error) => void;
  connection: (socket: Socket) => void;
  serverListen: (port?: number) => void;
  clientError: (err: Error, socket: Duplex) => void;
  request: http.RequestListener<ServerRequest, ServerResponse>;
  checkContinue: http.RequestListener<ServerRequest, ServerResponse>;
  checkExpectation: http.RequestListener<ServerRequest, ServerResponse>;
  connect: (req: InstanceType<ServerRequest>, socket: Duplex, head: Buffer) => void;
  upgrade: (req: InstanceType<ServerRequest>, socket: Duplex, head: Buffer) => void;
};

export type ServerConfig = {
  port: number;
  events: Map<
    ServerEventName<keyof ServerEventsMap>,
    ServerEventsMap[keyof ServerEventsMap][]
  >;
  listeners: Map<keyof ServerEventsMap, ServerListener['listener'][]>;
};

export type ServerSetup<This = void> = {
  setPort: (port: number) => This;
  addEvent: <Name extends keyof ServerEventsMap>(
    name: ServerEventName<Name>,
    listener: ServerEventsMap[Name]
  ) => This;

  addListener: <Name extends keyof ServerEventsMap | string>(
    name: Name,
    listener: Name extends keyof ServerEventsMap
      ? ServerEventsMap[Name]
      : ServerListener['listener']
  ) => This;
};

export type HostSetup<This = void> = {
  addRoute: (
    path: string,
    handler: (
      route: express.Router,
      packet: { req: express.Request; res: express.Response }
    ) => void
  ) => This;
  addMiddleware: (handler: express.RequestHandler) => This;
};
