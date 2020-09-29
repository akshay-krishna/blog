import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    default: new Date().toLocaleDateString(),
  },

  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
});

export default mongoose.model("users", UserSchema);
