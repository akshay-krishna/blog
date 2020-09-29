import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import expressValidator from "express-validator";
import auth from "../middleware/auth.js";
const { body, validationResult } = expressValidator;

const router = express.Router();

// get all the posts
router.get("/", async (req, res) => {
  try {
    let posts = await Post.find({});
    posts = posts.map((post) => {
      post.blogBody = post.blogBody.slice(1, 200);
      return post;
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// get a specific post
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const post = await Post.findById(pid)
      .populate("comments author", "-password")
      .exec();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// create a new post
router.post(
  "/",
  [body("title").notEmpty(), body("blogBody").notEmpty(), auth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { body, uid } = req;
    const { title, blogBody } = body;
    const newPost = new Post({
      title,
      blogBody,
      author: uid,
    });
    try {
      const user = await User.findById(uid);
      const { id } = await newPost.save();
      user.posts.unshift(id);
      await user.save();
      res.sendStatus(200);
    } catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  }
);

// update a specific post
router.put(
  "/:pid",
  [body("title").notEmpty(), body("blogBody").notEmpty(), auth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { uid, body, params } = req;
    const { pid } = params;
    const { title, blogBody } = body;
    try {
      const { author } = await Post.findById(pid, "author");
      if (uid != author) return res.sendStatus(401);
      await Post.findByIdAndUpdate(pid, { title, blogBody });
      res.sendStatus(200);
    } catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  }
);
// delete a specific post
router.delete("/:pid", auth, async (req, res) => {
  const { uid, params } = req;
  const { pid } = params;
  try {
    const { author } = await Post.findById(pid, "author");
    if (uid != author) return res.sendStatus(401);
    await Post.findByIdAndDelete(pid);
    let user = await User.findById(uid);
    user.posts = user.posts.filter((post) => post != pid);
    await user.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

export default router;
