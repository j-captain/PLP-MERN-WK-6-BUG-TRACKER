require('dotenv').config();
const mongoose = require('mongoose');

let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    console.log('\x1b[33m%s\x1b[0m', '⚠️  Using existing database connection');
    return;
  }

  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mjkmernbagtrackerdb';

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    
    console.log('\n');
    console.log('\x1b[36m%s\x1b[0m', '🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗');
    console.log('\x1b[32m%s\x1b[0m', '   ✅ Connected to MongoDB');
    console.log('\x1b[36m%s\x1b[0m', '🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗');
    console.log('\x1b[34m%s\x1b[0m', `   Host: ${conn.connection.host}`);
    console.log('\x1b[34m%s\x1b[0m', `   Database: ${conn.connection.name}`);
    console.log('\x1b[36m%s\x1b[0m', '🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗');
    console.log('\n');
    
    return conn;
  } catch (err) {
    console.log('\n');
    console.log('\x1b[31m%s\x1b[0m', '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
    console.log('\x1b[31m%s\x1b[0m', '   ❌ MongoDB connection error');
    console.log('\x1b[31m%s\x1b[0m', '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
    console.error('\x1b[31m%s\x1b[0m', `   Error: ${err.message}`);
    console.log('\n');
    process.exit(1);
  }
};

module.exports = connectDB;