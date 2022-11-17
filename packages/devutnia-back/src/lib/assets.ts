import * as path from 'path';
import * as express from 'express';

export const assets = () => {
  const assets = express.Router();

  assets.use('/', express.static(path.join(__dirname, 'assets')));

  return assets;
};
