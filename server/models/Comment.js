import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
    required: true,
  },
  commentBody: {
    type: String,
    required: true,
  },
});

export default mongoose.model("comments", CommentSchema);
