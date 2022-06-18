const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createProduct = async (name, quantity) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('products').insertOne({ name, quantity });

  return insertedId;
};

const findByname = async (name) => {
  const conn = await connect();

  const product = await conn.collection('products').findOne({ name });
 
  if (product) {
    return true;
  }
};

const productsFind = async () => {
  const conn = await connect();

  const products = await conn.collection('products').find().toArray();

  return products;
};

const productsFindById = async (id) => {
  try { 
    const conn = await connect();
    const product = await conn.collection('products').findOne({ _id: ObjectId(id) });
    return product;
  } catch (error) {
    return null;
  }
 };

const updateProductById = async (id, name, quantity) => {
  const conn = await connect();
  await conn.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return productsFindById(id);
};

const deleteProductById = async (id) => {
  try {
    const conn = await connect();
    const product = await productsFindById(id);
    await conn.collection('products').deleteOne({ _id: ObjectId(id) });

    return product;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createProduct,
  findByname,
  productsFind,
  productsFindById,
  updateProductById,
  deleteProductById,
};
