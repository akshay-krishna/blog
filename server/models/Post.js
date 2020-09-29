import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: new Date().toLocaleDateString(),
  },
  title: {
    type: String,
    required: true,
  },
  blogBody: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

export default mongoose.model("posts", PostSchema);
