const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// User routes
router.get('/load', userController.loadData);
router.delete('/users', userController.deleteAllUsers);
router.delete('/users/:userId', userController.deleteUserById);
router.get('/users/:userId', userController.getUserById);
router.put('/users', userController.createUser);

// Post routes
router.get('/posts/:postId', postController.getPostById);
router.get('/users/:userId/posts', postController.getPostsByUserId);

// Comment routes
router.get('/posts/:postId/comments', commentController.getCommentsByPostId);

module.exports = router;