'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    urlImage: { type: DataTypes.STRING, defaultValue: null, field: 'url_image' },
  },
  {
    timestamps: false,
    tableName: 'products',
  });
  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct, { foreignKey: 'product_id', as: 'sales' });
  };
  
  return Product;
};
