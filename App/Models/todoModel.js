const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user"
    }
  },

  {
    timestamps: true
  }
);

const todo = mongoose.model("todo", todoSchema);
module.exports = todo;
