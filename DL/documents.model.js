const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  type: { type: String, enum: ["directory", "file"] },
  name: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "document" }],
  date:{type: Date, default: new Date},
  isActive: { type: Boolean, default: true },
});

const users = mongoose.model("document", documentSchema);

module.exports = users;
