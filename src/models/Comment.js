const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "posts",
    },
    name: { type: String, required: true, trim: true, maxLength: 50 },
    email: { type: String, required: true },
    content: { type: String, required: true },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema);
