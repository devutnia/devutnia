import * as http from 'http';

import type * as Dev_ from './types';

export class DevutniaServer {
  private server: { events: Dev_.ServerEventsList; listeners: Dev_.ServerListenersList } =
    {
      listeners: new Map(),
      events: new Map([
        [
          'on:serverListen',
          (port) => console.log(`DevutniaServer listening on http://localhost:${port}`),
        ],
      ]),
    };

  http = http.createServer();

  addEvent<Event extends keyof Dev_.ServerEventsMap>(
    name: Dev_.ServerEventName<Event>,
    listener: Dev_.ServerEventsMap[Event]
  ) {
    this.server.events.set(name, listener);
    return this;
  }

  removeEvent<Event extends keyof Dev_.ServerEventsMap>(
    name: Dev_.ServerEventName<Event>
  ) {
    const event = this.server.events.get(name.split(':')[1] as never)?.[1];
    this.http.removeListener(name, event);
    this.server.events.delete(name);
    return this;
  }

  removeAllEvents() {
    [...this.server.events.keys()].forEach(this.removeEvent);
    return this;
  }

  addListener<Name extends string>(
    name: Dev_.ServerListenerName<Name>,
    listener: http.RequestListener
  ) {
    this.server.listeners.set(name, listener);
    return this;
  }

  removeListener<Name extends string>(name: Dev_.ServerListenerName<Name>) {
    const listener = this.server.listeners.get(name as never)?.[1];
    this.http.removeListener(name, listener);
    this.server.listeners.delete(name as never);
    return this;
  }

  removeAllListeners() {
    [...this.server.listeners.keys()].forEach(this.removeListener);
    return this;
  }

  start(port = 1984) {
    for (const [name, cb] of this.server.events.entries()) {
      const [fn, event] = name.split(':');
      this.http[fn](event, cb);
    }

    for (const [name, cb] of this.server.listeners.entries()) {
      const [event] = name.split(':');
      this.http.addListener(event, cb);
    }

    this.http.listen(port);
    this.http.emit('serverListen', port);
  }
}
