const { ObjectId } = require('mongodb');
const connection = require('./connection');

const salesCreate = async (vendas) => {
  const conn = await connection();
  const { insertedId } = await conn
    .collection('sales')
    .insertOne({ itensSold: vendas });

  return insertedId;
};

const salesFind = async () => {
  const conn = await connection();
  const sales = await conn.collection('sales').find().toArray();

  return sales;
};

const salesFindById = async (id) => {
  try {
    const conn = await connection();
    const sales = await conn.collection('sales').findOne({ _id: ObjectId(id) });
    return sales;
  } catch (error) {
    return null;
  }
};

const updateSalesById = async (id, sales) => {
  const conn = await connection();
  await conn
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } });

  return id;
};

const deleteSalesById = async (id) => {
  try {
    const conn = await connection();
    const sale = await salesFindById(id);
    await conn.collection('sales').deleteOne({ _id: ObjectId(id) });

    return sale;
  } catch (error) {
    return null;
  }
};

module.exports = {
  salesCreate,
  salesFind,
  salesFindById,
  updateSalesById,
  deleteSalesById,
};
