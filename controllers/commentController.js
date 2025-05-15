const Comment = require('../models/Comment');
const Post = require('../models/Post');

const getCommentsByPostId = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const comments = await Comment.findByPostId(postId);
    
    if (!comments || comments.length === 0) {
      return res.status(404).json({ error: 'No comments found for this post' });
    }
    
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get comments' });
  }
};

module.exports = {
  getCommentsByPostId
};