const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: "Phone must be 10 digits",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        const passwordRegex = /^[A-Z].{7,}\d{2}$/;
        return passwordRegex.test(v);
      },
      message: "Password must be min 10 chars, start with capital, end with 2 numbers",
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);