/* @flow */

import express from 'express';
import body_parser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';
import config from './config/config.json';


const app = express();
const upload = multer();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log('server is listening');
});

//sample routes
app.get('/hello', (req, res) => {
  res.send('world');
});

//sample routes
app.get('/add/:x/:y', (req, res) => {
  const x = req.params.x * 1;
  const y = req.params.y * 1;
  res.send({ sum: x+y });
});