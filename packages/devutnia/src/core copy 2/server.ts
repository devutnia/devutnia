import * as http from 'http';
import * as httpProxy from 'http-proxy';

import * as T from './types';

export class DevutniaServer<Host extends T.ServerListener> {
  private config: T.ServerConfig = {
    port: 1984,
    listeners: new Map([]),
    events: new Map([
      [
        'on:serverListen',
        [(port) => console.log(`Devutnia working on http://localhost:${port}`)],
      ],
    ]),
  };

  http: Omit<http.Server, 'listen'>;

  constructor(
    { host, proxy }: { host: Host; proxy?: httpProxy },
    setup?: (server: T.ServerSetup<DevutniaServer<Host>>) => void
  ) {
    this.start = this.start.bind(this);
    this.setPort = this.setPort.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.addListener = this.addListener.bind(this);

    this.http = http.createServer((req, res) => {
      host.listener(req, res);

      if (proxy) {
        proxy.web(req, res);
        this.addListener('upgrade', proxy.ws);
      }
    });

    if (setup) {
      setup({
        setPort: this.setPort,
        addListener: this.addListener,
        addEvent: this.addEvent as never,
      });
    }
  }

  setPort(port: number) {
    this.config.port = port;
    return this;
  }

  addEvent<Name extends keyof T.ServerEventsMap>(
    name: T.ServerEventName<Name>,
    listener: T.ServerEventsMap[Name]
  ) {
    if (this.config.events.has(name)) {
      const callbacks = this.config.events.get(name);
      callbacks.push(listener);
      this.config.events.set(name, callbacks);
    } else this.config.events.set(name, [listener]);

    return this;
  }

  addListener<Name extends keyof T.ServerEventsMap | string>(
    name: Name,
    listener: Name extends keyof T.ServerEventsMap
      ? T.ServerEventsMap[Name]
      : T.ServerListener['listener']
  ) {
    const n = name as never;
    if (this.config.listeners.has(n)) {
      const callbacks = this.config.listeners.get(n);
      callbacks.push(listener);
      this.config.listeners.set(n, callbacks);
    } else this.config.listeners.set(n, [listener]);

    return this;
  }

  start() {
    for (const [name, cbs] of this.config.events.entries()) {
      const [fn, event] = name.split(':');
      cbs.forEach((cb) => this.http[fn](event, cb));
    }

    for (const [name, cbs] of this.config.listeners.entries()) {
      cbs.forEach((cb) => this.http.addListener(name, cb));
    }

    const port = this.config.port;

    this.http['listen'](port);
    this.http.emit('serverListen', port);
  }
}
