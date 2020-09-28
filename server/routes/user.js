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
      const { name, id, avatar, email, admin } = await newUser.save();
      const jwt = await tokenGen({ id, email, admin });
      res.setHeader(
        "Set-Cookie",
        `x-auth-token=${JSON.stringify(jwt)};HttpOnly`
      );
      res.json({
        name,
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
//AUTH: Get the user data
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, "-password");
    res.json(user);
  } catch (err) {
    if (err.name === "CastError") {
      return res.sendStatus(404);
    }
    console.error(err.message);
    res.sendStatus(500);
  }
});

// AUTH: Update a user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, req.body);
    res.sendStatus(200);
  } catch (err) {
    if (err.name === "CastError") {
      return res.sendStatus(404);
    }
    console.error(err.message);
    res.sendStatus(500);
  }
});
// AUTH: Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
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
