const { getDb } = require('../config/db');

class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.username = userData.username;
    this.email = userData.email;
    this.address = userData.address;
    this.phone = userData.phone;
    this.website = userData.website;
    this.company = userData.company;
  }

  async save() {
    const db = getDb();
    return await db.collection('users').insertOne(this);
  }

  static async createMany(users) {
    const db = getDb();
    return await db.collection('users').insertMany(users);
  }

  static async findAll() {
    const db = getDb();
    return await db.collection('users').find().toArray();
  }

  static async findById(userId) {
    const db = getDb();
    return await db.collection('users').findOne({ id: userId });
  }

  static async deleteById(userId) {
    const db = getDb();
    return await db.collection('users').deleteOne({ id: userId });
  }

  static async deleteAll() {
    const db = getDb();
    return await db.collection('users').deleteMany({});
  }

  static async exists(userId) {
    const db = getDb();
    const user = await db.collection('users').findOne({ id: userId });
    return !!user;
  }
}

module.exports = User;