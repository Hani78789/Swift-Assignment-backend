const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { fetchAndLoadData } = require('../utils/fetchData');

const loadData = async (req, res) => {
  try {
    await fetchAndLoadData();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteAll();
    await Post.deleteAll();
    await Comment.deleteAll();
    res.status(200).json({ message: 'All users and their related data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete all users' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    
    // Delete user
    const userDeleteResult = await User.deleteById(userId);
    if (userDeleteResult.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Delete user's posts and comments
    const posts = await Post.findByUserId(userId);
    const postIds = posts.map(post => post.id);
    
    await Post.deleteByUserId(userId);
    await Comment.deleteByPostIds(postIds);
    
    res.status(200).json({ message: 'User and related data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const posts = await Post.findByUserId(userId);
    
    // Get comments for each post
    const postsWithComments = await Promise.all(posts.map(async post => {
      const comments = await Comment.findByPostId(post.id);
      return {
        ...post,
        comments
      };
    }));
    
    const response = {
      ...user,
      posts: postsWithComments
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    
    // Validate required fields
    if (!userData.id || !userData.name || !userData.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check if user already exists
    const userExists = await User.exists(userData.id);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    await User.create(userData);
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

module.exports = {
  loadData,
  deleteAllUsers,
  deleteUserById,
  getUserById,
  createUser
};