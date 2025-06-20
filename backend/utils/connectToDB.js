const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();



const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.log("Error in connecting to mongodb database");
    process.exit(1);
  }
};

module.exports = connectToDB;
