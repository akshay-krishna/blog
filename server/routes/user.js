import express from "express";
import expressValidator from "express-validator";
import User from "../models/User.js";
import hash from "../helper/hash.js";
import tokenGen from "../helper/tokenGen.js";
import auth from "../middleware/auth.js";

const { body, validationResult } = expressValidator;
const router = express.Router();

// get all the user
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});
// Create a user
router.post(
  "/",
  [
    body("name").notEmpty(),
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      req.body.password = await hash(req.body.password);
      const newUser = new User(req.body);
      const { name, id, avatar, email, admin, date } = await newUser.save();
      const jwt = await tokenGen({ id, email, admin });
      const d = new Date();
      d.setTime(d.getTime() + 3600000);
      res.setHeader(
        "Set-Cookie",
        `x-auth-token=${JSON.stringify(jwt)};HttpOnly;expires=${d};`
      );
      res.json({
        name,
        date,
        id,
        avatar,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.sendStatus(409);
      }
      console.error(err.message);
      res.sendStatus(500);
    }
  }
);

// Get the user data
router.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const { date, email, name, id, posts } = await User.findById(
      uid,
      "-password"
    ).populate("posts");
    res.json({
      date,
      email,
      name,
      id,
      posts,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.sendStatus(404);
    }
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Update the authenticated user
router.put("/", auth, async (req, res) => {
  const { uid, body } = req;
  try {
    await User.findByIdAndUpdate(uid, body);
    res.sendStatus(200);
  } catch (err) {
    if (err.name === "CastError") {
      return res.sendStatus(404);
    }
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Delete the authenticated user user
router.delete("/", auth, async (req, res) => {
  const { uid } = req;
  try {
    await User.findByIdAndDelete(uid);
    res.sendStatus(200);
  } catch (err) {
    if (err.name === "CastError") {
      return res.sendStatus(404);
    }
    console.error(err.message);
    res.sendStatus(500);
  }
});

export default router;
