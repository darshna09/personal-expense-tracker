import 'dotenv/config';
import express from 'express';
import { env } from './config/env.js';

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello, TypeScript and Express!');
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
