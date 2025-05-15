const { getDb } = require('../config/db');

class Comment {
  constructor(commentData) {
    this.id = commentData.id;
    this.postId = commentData.postId;
    this.name = commentData.name;
    this.email = commentData.email;
    this.body = commentData.body;
  }

  static async create(comment) {
    const db = getDb();
    return await db.collection('comments').insertOne(comment);
  }

  static async createMany(comments) {
    const db = getDb();
    return await db.collection('comments').insertMany(comments);
  }

  static async findByPostId(postId) {
    const db = getDb();
    return await db.collection('comments').find({ postId: postId }).toArray();
  }

  static async deleteByPostIds(postIds) {
    const db = getDb();
    return await db.collection('comments').deleteMany({ postId: { $in: postIds } });
  }

  static async deleteAll() {
    const db = getDb();
    return await db.collection('comments').deleteMany({});
  }
}

module.exports = Comment;