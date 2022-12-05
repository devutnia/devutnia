import Devutnia from './core';

Devutnia.startServer();

// import { proxyMap } from 'valtio/utils';
// import * as valtio from 'valtio/vanilla';

// import * as http from 'http';
// import { PeerServer } from 'peer';
// import * as express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// import type { BlueprintScheme, DevutniaBlueprint } from './core/types';

// class Devutnia implements DevutniaBlueprint {
//   private router = express();
//   private blueprint = valtio.proxy<BlueprintScheme>({
//     port: 1984,
//     proxy_config: { ws: true },
//     // p2p_config: { proxied: true, allow_discovery: true } as never,
//   });

//   constructor(loader?: (blueprint: BlueprintScheme) => void) {
//     this.createServer = this.createServer.bind(this);

//     loader?.(this.blueprint);

//     this.createServer(this.blueprint);
//   }

//   createServer(blueprint?: Partial<BlueprintScheme>) {
//     const config = { ...this.blueprint, ...blueprint };

//     this.router.use(
//       '**',
//       createProxyMiddleware({
//         target: 'http://localhost',
//         router: {
//           '/front': 'http://localhost:19841',
//           '/back': 'http://localhost:19842',
//         },
//       })
//     );

//     return this.router;
//   }
// }

// const devutnia = new Devutnia();
