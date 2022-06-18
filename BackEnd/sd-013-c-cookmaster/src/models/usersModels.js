// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getUser = async (email) => {
  const conn = await connect();
  const user = await conn.collection('users').findOne({ email });
  if (user) {
    return user;
  }
  return false;
};

const registerUser = async (user) => {
  const db = await connect();
  const { _id } = await db.collection('users').insertOne({ role: 'user', ...user });

  return { _id };
};

module.exports = {
  registerUser,
  getUser,
};