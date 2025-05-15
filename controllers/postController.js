const Post = require('../models/Post');
const Comment = require('../models/Comment');

const getPostById = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const comments = await Comment.findByPostId(postId);
    const postWithComments = {
      ...post,
      comments
    };
    
    res.status(200).json(postWithComments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get post' });
  }
};

const getPostsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const posts = await Post.findByUserId(userId);
    
    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: 'No posts found for this user' });
    }
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get posts' });
  }
};

module.exports = {
  getPostById,
  getPostsByUserId
};