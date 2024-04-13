require('dotenv').config();

const mongoose = require('mongoose');

const DB_URL = process.env.MONGODB_URI;

const connectDB = () => {
  return mongoose.connect(DB_URL);
};

const db = mongoose.connection;
db.on('error', console.error.bind('error'));

module.exports = connectDB;

// export default connectDB;
