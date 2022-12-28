import { createHost, createProxy, createServer } from './core';

const host = createHost({
  routes: {
    '/': (route) => route.get('/', (_, res) => res.send(`<div>Henlo</div>`)),
  },
});
const proxy = createProxy({ options: { target: 'http://localhost:1984' } });
const server = createServer({ host, proxy });

server.listen(1984);
