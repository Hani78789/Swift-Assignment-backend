const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Venkat:Venkat%402002@cluster0.qdstrz6.mongodb.net/mearnapp?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;
const connectToDb = async () => {
  try {
    await client.connect();
    db = client.db('node_assignment');
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { connectToDb, getDb };
