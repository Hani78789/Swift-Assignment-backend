const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const createUser = async (userData) => {
  try {
    const userExists = await User.exists(userData.id);
    if (userExists) {
      throw new Error('User already exists');
    }
    
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Failed to create user: ' + error.message);
  }
};

const getUserWithPostsAndComments = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const posts = await Post.findByUserId(userId);
    
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.findByPostId(post.id);
        return {
          ...post,
          comments
        };
      })
    );
    
    return {
      ...user,
      posts: postsWithComments
    };
  } catch (error) {
    throw new Error('Failed to get user with posts and comments: ' + error.message);
  }
};

const deleteUserAndRelatedData = async (userId) => {
  try {
    const userDeleteResult = await User.deleteById(userId);
    if (userDeleteResult.deletedCount === 0) {
      throw new Error('User not found');
    }
    
    const posts = await Post.findByUserId(userId);
    const postIds = posts.map(post => post.id);
    
    await Post.deleteByUserId(userId);
    await Comment.deleteByPostIds(postIds);
    
    return { message: 'User and related data deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete user and related data: ' + error.message);
  }
};

module.exports = {
  createUser,
  getUserWithPostsAndComments,
  deleteUserAndRelatedData
};