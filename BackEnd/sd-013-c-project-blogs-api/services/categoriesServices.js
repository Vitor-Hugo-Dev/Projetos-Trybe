const { Categories } = require('../models');
const { validateCreateCategories } = require('../utils/validates');

module.exports = {
  criateCategoriesService: async (categorie) => {
    const validate = await validateCreateCategories(categorie);
    
    if (validate !== true) throw validate;
    
    const curentCategorie = await Categories.create(categorie);
    console.log(curentCategorie.dataValues);
    return curentCategorie;
  },
  getCategoriesServices: async () => {
    const categories = await Categories.findAll();
  
    return categories;
  },
};