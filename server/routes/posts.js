import express from "express";
import Post from "../models/Post.js";
import expressValidator from "express-validator";

const { body, validationResult } = expressValidator;

const router = express.Router();

// get all the posts
router.get("/", async (req, res) => {
  try {
    let posts = await Post.find({});
    posts = posts.map((post) => {
      post.body = post.body.slice(1, 200);
      return post;
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// create a new post
router.post(
  "/",
  [body("title").notEmpty(), body("body").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { title, body } = req.body;
    const newPost = new Post({
      title,
      body,
    });
    try {
      const savedPost = await newPost.save();
      res.json(savedPost);
    } catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  }
);

// get a specific post
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("comments").exec();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// update a specific post
router.put(
  "/:id",
  [body("title").notEmpty(), body("body").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { id } = req.params;
    const { title, body } = req.body;
    try {
      await Post.findByIdAndUpdate(id, { title, body });
      res.sendStatus(200);
    } catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  }
);
// delete a specific post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

export default router;
