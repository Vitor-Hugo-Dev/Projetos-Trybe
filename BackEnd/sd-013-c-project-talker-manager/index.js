const express = require('express');
const bodyParser = require('body-parser');

// const rescue = require('express-rescue');

const getAlltalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const postLogin = require('./middlewares/postLogin');
const postTalker = require('./middlewares/postTalker');
const putTalkerById = require('./middlewares/putTalkerById');
const deleteTalker = require('./middlewares/deleteTalker');
const searchTalker = require('./middlewares/searchTalker');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
} = require('./middlewares/validates');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', validateToken, searchTalker);

app.get('/talker', getAlltalkers);

app.get('/talker/:id', getTalkerById);

app.post('/login', postLogin);

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk.exists,
  validateTalk.watchedAt,
  validateTalk.rate,
  postTalker,
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk.exists,
  validateTalk.watchedAt,
  validateTalk.rate,
  putTalkerById,
);

app.delete('/talker/:id', validateToken, deleteTalker);
// commit correção

app.listen(PORT, () => {
  console.log('Online', PORT);
});
