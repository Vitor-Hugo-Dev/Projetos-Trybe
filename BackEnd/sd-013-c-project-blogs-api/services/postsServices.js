const { BlogPosts, Users, Categories } = require('../models');
const {
  validateCreatePost,
  validateGetPostId,
  validateUpdatePost,
  validatePostDelete,
} = require('../utils/validates');

module.exports = {
  createPostServices: async (post, userId) => {
    const validate = await validateCreatePost(post);
    if (validate !== true) throw validate;

    const postCreate = await BlogPosts.create({ ...post, userId });
    return postCreate;
  },
  getPostsServices: async () => {
    const posts = await BlogPosts.findAll({
      include: [
        {
          model: Users,
          as: 'user',
        },
        {
          model: Categories,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });
    return posts;
  },
  getPostByIdServices: async (id) => {
    const post = await BlogPosts.findOne({
      where: { id },
      include: [
        {
          model: Users,
          as: 'user',
        },
        {
          model: Categories,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });

    await validateGetPostId(post);

    return post;
  },
  updatePostServices: async (post, userIdPost, currentId) => {
    const validate = await validateUpdatePost(post, userIdPost, currentId);
    if (validate !== true) throw validate;
    console.log(post, validate);
    await BlogPosts.update(post, { where: { id: currentId } });
    const newPost = await BlogPosts.findOne({
      where: { id: currentId },
      include: [{ 
          model: Users,
          as: 'user',
        },
        {
          model: Categories,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });

    return newPost;
  },
  deletePostServices: async (postId, userId) => {
    await validatePostDelete(postId, userId);

    await BlogPosts.destroy({ where: { id: postId } });
    
    return true;
  },
};
