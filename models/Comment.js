import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  commentBody: {
    type: String,
    required: true,
  },
});

export default mongoose.model("comments", CommentSchema);
