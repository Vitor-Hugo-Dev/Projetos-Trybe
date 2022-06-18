const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const validateJWT = require('./auth/validateJWT');

const {
  registerUserController,
  loginUserController } = require('../controllers/userControllers');
const errorMiddleware = require('../middlewares/errorMiddleware');
const { 
  registerRecipesController,
  listRecipesController,
  listRecipeByIdController, 
  updateRecipesController, 
  deleteRecipesController, 
  uploadImageController } = require('../controllers/recipesController');
const { upload } = require('../middlewares/upload');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, './uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', registerUserController);
app.post('/login', loginUserController);

app.post('/recipes', validateJWT, registerRecipesController);
app.get('/recipes/:id', listRecipeByIdController);
app.get('/recipes', listRecipesController);
app.put('/recipes/:id', validateJWT, updateRecipesController);
app.delete('/recipes/:id', validateJWT, deleteRecipesController);
app.put('/recipes/:id/image', validateJWT, upload.single('image'), uploadImageController);

app.use(errorMiddleware);
module.exports = app;
