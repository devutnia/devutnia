/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';

const app = express();

app.use('/', express.static(path.join(__dirname, 'front')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'front', 'index.html')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to devutnia-back!' });
});

const port = process.env.port || 1984;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
