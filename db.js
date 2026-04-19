const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://harsh:harsh@cluster0.ksgrf.mongodb.net/training_app");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("DB Error:", err);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose;