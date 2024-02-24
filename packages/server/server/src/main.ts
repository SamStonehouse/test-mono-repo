import express from 'express';
import { Logger } from '@csmono/logger';

const logger = new Logger();

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
  logger.log('Hello world');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
