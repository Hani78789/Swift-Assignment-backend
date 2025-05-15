const axios = require('axios');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const fetchAndLoadData = async () => {
  try {
    // Fetch data from JSONPlaceholder API
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/comments')
    ]);

    // Process users (limit to 10 as per requirement)
    const users = usersResponse.data.slice(0, 10);
    await User.deleteAll();
    await User.createMany(users);

    // Process posts
    const posts = postsResponse.data.filter(post => 
      users.some(user => user.id === post.userId)
    );
    await Post.deleteAll();
    await Post.createMany(posts);

    // Process comments
    const postIds = posts.map(post => post.id);
    const comments = commentsResponse.data.filter(comment => 
      postIds.includes(comment.postId)
    );
    await Comment.deleteAll();
    await Comment.createMany(comments);

    return true;
  } catch (error) {
    console.error('Error fetching and loading data:', error);
    throw error;
  }
};

module.exports = { fetchAndLoadData };