const express = require('express');
const bodyParser = require('body-parser');
const {
  createProduct,
  findProductsMd,
  findProductsByIdMd,
  updateProductMd,
  deleteProductMd,
} = require('./controllers/productControllers');
const errorMidleware = require('./middlewares/errorMidleware');
const {
  createSalesMd,
  findSalesMd,
  findSalesByIdMd,
  updateSalesMd,
  deleteSalesMd,
} = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createProduct);
app.get('/products/:id', findProductsByIdMd);
app.get('/products', findProductsMd);
app.put('/products/:id', updateProductMd);
app.delete('/products/:id', deleteProductMd);

app.post('/sales', createSalesMd);
app.get('/sales/:id', findSalesByIdMd);
app.get('/sales', findSalesMd);
app.put('/sales/:id', updateSalesMd);
app.delete('/sales/:id', deleteSalesMd);

app.use(errorMidleware);

app.listen(
  process.env.PORT || 3000,
  console.log(`Listening on port ${process.env.PORT || 3000}`),
);
