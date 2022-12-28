import { DevutniaHost, DevutniaServer, DevutniaProxy } from './core';

const host = new DevutniaHost();
const proxy = new DevutniaProxy({ target: 'http://localhost:19840', ws: true });
const server = new DevutniaServer({ host, proxy });

host.addRoute('/', (route) => route.get('/', (_, res) => res.send(`<div>Yo</div>`)));

server.start();
