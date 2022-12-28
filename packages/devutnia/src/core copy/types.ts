import * as http from 'http';

import { Socket } from 'node:net';
import { Duplex } from 'node:stream';

export type ServerEventType = 'on' | 'off' | 'once';
export type ServerEventName<Event extends keyof ServerEventsMap> =
  `${ServerEventType}:${Event}`;
export type ServerListenerName<Listener extends string = string> =
  `${keyof ServerEventsMap}:${Listener}`;
export type ServerRequest = typeof http.IncomingMessage;
export type ServerResponse = typeof http.ServerResponse;
export type ServerListener = Parameters<typeof http['createServer']>[1];
export type ServerListenersList = Map<ServerListenerName, ServerListener>;

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

export type ServerEventsList = Map<
  ServerEventName<keyof ServerEventsMap>,
  ServerEventsMap[keyof ServerEventsMap]
>;
