const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb+srv://hanishaa433:hanisha%402001@cluster0.ndvmzbw.mongodb.net/mearnapp?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;

const connectToDb = async () => {
  try {
    await client.connect();
    db = client.db('mearnapp'); // <- match this with your URI DB
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" Error connecting to MongoDB:", err);
    throw err;
  }
};

const getDb = () => {
  if (!db) {
    throw new Error(' Database not initialized');
  }
  return db;
};

module.exports = { connectToDb, getDb };
