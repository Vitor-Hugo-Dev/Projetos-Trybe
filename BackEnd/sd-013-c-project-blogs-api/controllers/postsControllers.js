const { createPostServices,
  getPostsServices,
  getPostByIdServices,
  updatePostServices,
  deletePostServices,
 } = require('../services/postsServices');
const { created, success, noContent } = require('../utils/statusCode');

module.exports = {
  createPostController: async (req, res, next) => {
    try {
      const post = req.body;
      const userId = req.user.id;
      const currentPost = await createPostServices(post, userId);
      
      return res.status(created).json(currentPost);
    } catch (error) {
      return next(error);
    }
  },
  getPostsController: async (req, res, next) => {
    try {
      const posts = await getPostsServices();

      return res.status(success).json(posts);
    } catch (error) {
      return next(error);
    }
  },
  getPostByIdController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await getPostByIdServices(id);

      return res.status(success).json(post);
    } catch (error) {
      return next(error);
    }
  },
  updatePostController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const post = req.body;
      const update = await updatePostServices(post, userId, id);

      return res.status(success).json(update);
    } catch (error) {
      return next(error);
    }
  },
  deletePostController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      await deletePostServices(id, userId);
      return res.status(noContent).end(); 
    } catch (error) {
      return next(error);
    }
  },
};
