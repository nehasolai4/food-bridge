const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ["donor", "acceptor"],
    required: true
  },
  phone: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);