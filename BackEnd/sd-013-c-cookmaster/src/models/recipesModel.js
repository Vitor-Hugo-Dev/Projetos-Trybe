const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerRecipes = async (recipes) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('recipes').insertOne(recipes);

  return { _id: insertedId };
};

const listRecipes = async () => {
  const conn = await connect();
  const recipes = await conn.collection('recipes').find().toArray();

  return recipes;
};

const listRecipeById = async (id) => {
  try {
    const conn = await connect();
    const recipe = await conn
      .collection('recipes')
      .findOne({ _id: ObjectId(id) });

    return recipe;
  } catch (error) {
    return false;
  }
};

const updateRecipes = async (id, recipe) => {
  try {
    const conn = await connect();
    await conn
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: recipe });
    return id;
  } catch (error) {
    return false;
  }
};

const deleteRecipes = async (id) => {
  try {
    const conn = await connect();
    await conn.collection('recipes').deleteOne({ _id: ObjectId(id) });
  } catch (error) {
    return false;
  }
};

module.exports = {
  registerRecipes,
  listRecipes,
  listRecipeById,
  updateRecipes,
  deleteRecipes,
};
