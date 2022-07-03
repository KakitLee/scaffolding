import express from 'express';
import CONFIG from './config';

const app = new express();

app.get('/', (req, res) => {
  res.json({ test: 2 });
});

app.listen(CONFIG.PORT, CONFIG.HOST, () => {
  console.log('App start at', CONFIG.PORT, CONFIG.HOST);
});
