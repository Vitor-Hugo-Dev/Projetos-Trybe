const Joi = require('@hapi/joi');
const errorHandler = require('./errorHandler');
const { badRequest, conflict, notFound, unauthorized } = require('./statusCode');
const { Users, Categories, BlogPosts } = require('../models');

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().not().empty()
.required(),
  password: Joi.string().required(),
});

const schemaCategorie = Joi.object({
  name: Joi.string().required(),
});

const schemaPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
});

const schemaPostUpdate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  validateUserCreate: async (user) => {
    const { error } = schemaUser.validate(user);
    const userFind = await Users.findOne({
      where: { email: user.email || '' },
    });
    if (error) throw errorHandler(badRequest, error.message);

    if (userFind) throw errorHandler(conflict, 'User already registered');

    return true;
  },
  validateLogin: async (email, password) => {
    const { error } = schemaLogin.validate({ email, password });
    const user = await Users.findOne({ where: { email: email || '' } });

    if (error) throw errorHandler(badRequest, error.message);

    if (!user || user.password !== password) {
      throw errorHandler(badRequest, 'Invalid fields');
    }

    return true;
  },
  validateGetById: async (id) => {
    const validUser = await Users.findByPk(id);
    if (!validUser) throw errorHandler(notFound, 'User does not exist');

    return true;
  },
  validateCreateCategories: async (categorie) => {
    const { error } = schemaCategorie.validate(categorie);
    if (error) {
      throw errorHandler(badRequest, error.message);
    }

    return true;
  },
  validateCreatePost: async (post) => {
    const { error } = schemaPost.validate(post);
    if (error) throw errorHandler(badRequest, error.message);

    const findCategory = await Categories.findAll({
      where: { id: post.categoryIds },
    });
    if (!findCategory[0]) { throw errorHandler(badRequest, '"categoryIds" not found'); }

    return true;
  },
  validateGetPostId: async (thisPost) => {
    if (!thisPost) throw errorHandler(notFound, 'Post does not exist');

    return true;
  },
  validateUpdatePost: async (post, userIdPost, currentId) => {
    const { categoryIds } = post;
    if (categoryIds) throw errorHandler(badRequest, 'Categories cannot be edited');

    const { error } = schemaPostUpdate.validate(post);
    if (error) throw errorHandler(badRequest, error.message);

    const currentUser = await Users.findByPk(userIdPost);
    if (Number(currentId) !== currentUser.id) {
      throw errorHandler(unauthorized, 'Unauthorized user');
    }

    return true;
  },
  validatePostDelete: async (postId, userId) => {
    const post = await BlogPosts.findOne({ where: { id: postId } });
    if (!post) throw errorHandler(notFound, 'Post does not exist');

    if (post.id !== userId) {
      throw errorHandler(unauthorized, 'Unauthorized user');
    }

    return true;
  },
  validateUserDelete: async (userId) => {
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) throw errorHandler(notFound, 'User does not exist');

    return true;
  },
};
