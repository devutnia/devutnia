import * as http from 'http';
import * as express from 'express';
import { Server as SocketServer, Socket } from 'socket.io';

const devutniaSocket = (
  server: http.Server,
  loader?: (setup: { socket: Socket }) => void
) => {
  const socket = new SocketServer(server);

  return (req: express.Request, res: express.Response) => {

    const route = express.Router();

    socket.on('connection', (socket) => {
      loader?.({ socket });
    });

    return route;
  };
};

class devutnia {
  static app = express();
  static server = http.createServer(devutnia.app);

  static {
    devutnia.app.use('/socket', devutniaSocket(devutnia.server));
  }

  static attachCustomServer(server: (app: express.Express) => http.Server) {
    devutnia.server = server(devutnia.app);
  }

  static startServer() {
    devutnia.app.listen(19840, () => {
      console.log('Devutnia listening at http://localhost:19840');
    });
  }
}

export default devutnia;
