const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connection Sucessfull");
  } catch (error) {
    console.log("Database connection Failed", error);
  }
};

module.exports = connectDB;
