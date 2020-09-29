import express from "express";

import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import expressValidator from "express-validator";
import auth from "../middleware/auth.js";

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
// create a comment
router.post("/:pid", auth, body("commentBody").notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const { params, uid, body } = req;
  const { commentBody } = body;
  const { pid } = params;
  const newComment = new Comment({ commentBody, author: uid });
  try {
    const savedComment = await newComment.save();
    const savedPost = await Post.findById(pid).populate("comments").exec();
    savedPost.comments.unshift(savedComment);
    await savedPost.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

//  update a specific comment
router.put("/:cid", auth, async (req, res) => {
  const { params, uid, body } = req;
  const { cid } = params;
  const { commentBody } = body;
  try {
    const { author } = await Comment.findById(cid, "author");
    if (author != uid) return res.sendStatus(401);
    await Comment.findByIdAndUpdate(cid, { commentBody });
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// delete a specific comment
router.delete("/:pid/:cid", auth, async (req, res) => {
  const { uid, params } = req;
  const { cid, pid } = params;
  try {
    const { author } = await Comment.findById(cid, "author");
    if (author != uid) return res.sendStatus(401);
    await Comment.findByIdAndDelete(cid);
    let posts = await Post.findById(pid);
    posts.comments = posts.comments.filter((comment) => comment != cid);
    await posts.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});
export default router;
