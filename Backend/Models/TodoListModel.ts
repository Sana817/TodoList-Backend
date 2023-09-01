const mongoose = require("mongoose");

const todoListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  task: String,
  editing: { type: Boolean, default: false },
});

module.exports = mongoose.model("TodoList", todoListSchema);
