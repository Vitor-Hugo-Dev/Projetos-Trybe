module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING,
      allowNull: false },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  User.associate = (models) => {
    User.hasMany(models.BlogPosts, {
      foreingKey: 'userId', as: 'blogPosts',
    });
  };

  return User;
};
