const mongoose = require("mongoose");
require("./documents.model");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  email: {
    type: String,
  },
  my_storage: { type: mongoose.Schema.Types.ObjectId,ref:"document" },
  isActive: { type: Boolean, default: true },
});

const users = mongoose.model("user", userSchema);

module.exports = users;
