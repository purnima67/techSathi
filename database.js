const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://purnimaok:Purnima123@cluster0.7etqyse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let client;

const connectDB = async () => {
  if (client) return client; 
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  try {
    await client.connect();
    console.log("MongoDB connected (native driver)");
    return client;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;