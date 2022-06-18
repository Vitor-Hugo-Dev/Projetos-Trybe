module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPosts',
    { id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    { createdAt: 'published',
      updatedAt: 'updated',
    },
  );
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users, {
      foreingKey: 'userId',
      as: 'user',
    });
  };
  return BlogPost;
};
