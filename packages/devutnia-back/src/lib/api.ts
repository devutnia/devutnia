import * as path from 'path';
import * as express from 'express';

export const api = () => {
  const api = express.Router();

  api.get('/', (req, res) => {
    res.send({ message: 'Welcome to devutnia-back!' });
  });

  return api;
};
