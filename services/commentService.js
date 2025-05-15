const Comment = require('../models/Comment');

const createComment = async (commentData) => {
  try {
    const comment = new Comment(commentData);
    await comment.save();
    return comment;
  } catch (error) {
    throw new Error('Failed to create comment');
  }
};

const getCommentsByPostId = async (postId) => {
  try {
    return await Comment.findByPostId(postId);
  } catch (error) {
    throw new Error('Failed to get comments');
  }
};

module.exports = {
  createComment,
  getCommentsByPostId
};