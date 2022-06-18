'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true, field: 'user_id'  },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true, field: 'seller_id' },
    totalPrice: { type: DataTypes.FLOAT, field: 'total_price' },
    deliveryAddress: { type: DataTypes.STRING, field: 'delivery_address' },
    deliveryNumber: { type: DataTypes.STRING, field: 'delivery_number' },
    status: DataTypes.STRING,
  },
  {
    timestamps: true,
    tableName: 'sales',
    updatedAt: false,
    createdAt: 'sale_date',
  });

  Sale.associate = (models) => {
    Sale.hasMany(models.SaleProduct, { foreignKey: 'sale_id', as: 'products' });
    Sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'seller' });
  };

  return Sale;
};
