const express = require('express');

const app = express();
const http = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
const userRouter = require('../rotas/usersRoutes');
const loginRouter = require('../rotas/loginRoutes');
const productRouter = require('../rotas/productsRouter');
const saleRouter = require('../rotas/saleRoutes');
const errorMiddleware = require('../middlewares/errorMiddleware');

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/sale', saleRouter);

app.use('/images', express.static(path.resolve(__dirname, '..', '..', 'images')));
app.use(errorMiddleware);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = http;
