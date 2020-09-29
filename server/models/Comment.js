import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: Date,
    required: true,
    default: new Date().toLocaleDateString(),
  },
  commentBody: {
    type: String,
    required: true,
  },
});

export default mongoose.model("comments", CommentSchema);
