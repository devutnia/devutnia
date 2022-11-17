import * as express from 'express';

import * as lib from './lib';

const app = express();

app.use(lib.logger);
app.use('/', lib.front());
app.use('/api', lib.api());
app.use('/assets', lib.assets());

app.listen(1984, () => {
  console.log(`Devutnia working at http://localhost:${1984}`);
});
