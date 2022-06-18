'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    quantity: DataTypes.INTEGER,
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'product_id',
      foreignKey: true,
    },
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'sale_id',
      foreignKey: true,
    },
  },
  {
    timestamps: false,
    tableName: 'salesProducts',
  });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sale, { foreignKey: 'sale_id' });
    SaleProduct.belongsTo(models.Product, { foreignKey: 'product_id' });
  };

  return SaleProduct;
};
