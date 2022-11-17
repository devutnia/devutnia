import * as path from 'path';
import * as express from 'express';

export const front = () => {
  const front = express.Router();

  front.use('/', express.static(path.join(__dirname, 'front')));
  front.get('/', (req, res) => res.sendFile(path.join(__dirname, 'front', 'index.html')));

  return front;
};
