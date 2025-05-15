const { getDb } = require('../config/db');

class Post {
  constructor(postData) {
    this.id = postData.id;
    this.userId = postData.userId;
    this.title = postData.title;
    this.body = postData.body;
  }

  static async create(post) {
    const db = getDb();
    return await db.collection('posts').insertOne(post);
  }

  static async createMany(posts) {
    const db = getDb();
    return await db.collection('posts').insertMany(posts);
  }

  static async findByUserId(userId) {
    const db = getDb();
    return await db.collection('posts').find({ userId: userId }).toArray();
  }

  static async deleteByUserId(userId) {
    const db = getDb();
    return await db.collection('posts').deleteMany({ userId: userId });
  }

  static async deleteAll() {
    const db = getDb();
    return await db.collection('posts').deleteMany({});
  }
}

module.exports = Post;