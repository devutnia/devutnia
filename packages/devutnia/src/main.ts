import { createBackend } from './core';

const backend = createBackend();
const host = backend.host();
const proxy = backend.proxy();
const server = backend.server({ host, proxy });

server.listen(1984);
