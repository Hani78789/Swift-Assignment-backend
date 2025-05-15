const Post = require('../models/Post');
const Comment = require('../models/Comment');

const createPost = async (postData) => {
  try {
    const post = new Post(postData);
    await post.save();
    return post;
  } catch (error) {
    throw new Error('Failed to create post');
  }
};

const getPostWithComments = async (postId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    
    const comments = await Comment.findByPostId(postId);
    return {
      ...post,
      comments
    };
  } catch (error) {
    throw new Error('Failed to get post with comments');
  }
};

const getPostsByUser = async (userId) => {
  try {
    return await Post.findByUserId(userId);
  } catch (error) {
    throw new Error('Failed to get posts by user');
  }
};

module.exports = {
  createPost,
  getPostWithComments,
  getPostsByUser
};