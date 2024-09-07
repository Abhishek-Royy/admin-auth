const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/adminAuth";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connection Sucessfull");
  } catch (error) {
    console.log("Database connection Failed", error);
  }
};

module.exports = connectDB;
