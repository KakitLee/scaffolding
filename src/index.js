import express from 'express';
import CONFIG from './config';
import { rateLimit } from './utils/rateLimit';

const app = express();

const handler = (req, res) => {
  res.status(200).send({ success: true });
};

app.get('/things', rateLimit, handler);

app.listen(CONFIG.PORT, CONFIG.HOST, () => {
  console.log('express running');
});
