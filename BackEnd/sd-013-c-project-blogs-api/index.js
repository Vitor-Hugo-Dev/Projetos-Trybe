const express = require('express');
const { 
  createCategoriesController,
  getCategoriesController,
 } = require('./controllers/categoriesController');
const { loginController } = require('./controllers/loginController');
const {
  createPostController,
  getPostsController,
  getPostByIdController, 
  updatePostController, 
  deletePostController } = require('./controllers/postsControllers');
const { 
  createUSerController,
  getUserController,
  getUserByIdController, 
  deleteUserController } = require('./controllers/userController');
const errorMiddleware = require('./middlewares/errorMiddleware');
const validateJWT = require('./middlewares/validateJWT');

const app = express();
app.use(express.json());

app.post('/user', createUSerController);
app.get('/user/:id', validateJWT, getUserByIdController);
app.get('/user', validateJWT, getUserController);
app.delete('/user/:id', validateJWT, deleteUserController);

app.post('/login', loginController);

app.post('/categories', validateJWT, createCategoriesController);
app.get('/categories', validateJWT, getCategoriesController);

app.post('/post', validateJWT, createPostController);
app.get('/post/:id', validateJWT, getPostByIdController);
app.get('/post', validateJWT, getPostsController);
app.put('/post/:id', validateJWT, updatePostController);
app.delete('/post/:id', validateJWT, deletePostController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));