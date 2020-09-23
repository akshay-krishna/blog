import express from "express";

import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import expressValidator from "express-validator";

const router = express.Router();
const { body, validationResult } = expressValidator;

// get all comments for a post
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const posts = await Post.findById(pid, "comments");
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});
// create a comment
router.post("/:pid", body("commentBody").notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const { pid } = req.params;
  const { commentBody } = req.body;
  const newComment = new Comment({ commentBody });
  try {
    const savedComment = await newComment.save();
    const savedPost = await Post.findById(pid);
    savedPost.comments.unshift(savedComment);
    await savedPost.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// get a specific comment
router.get(":/cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const savedComment = await Comment.findById(cid);
    res.json(savedComment);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});
//  update a specific comment
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const {commentBody}
  try {
    await Comment.findByIdAndUpdate(id);
  } catch (err) {}
});
// delete a specific comment

export default router;
