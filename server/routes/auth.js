import express from "express";
import expressValidator from "express-validator";
import compareHash from "../helper/compareHash.js";
import tokenGen from "../helper/tokenGen.js";
import User from "../models/User.js";

const router = express.Router();
const { body, validationResult } = expressValidator;

// login route
router.post(
  "/login",
  [body("email").notEmpty().isEmail(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (await compareHash(password, user.password)) {
        const { id, email, admin, avatar, name } = user;
        const jwt = await tokenGen({ id, email, admin });
        res.setHeader(
          "Set-Cookie",
          `x-auth-token=${JSON.stringify(jwt)};HttpOnly;path=/`
        );
        return res.json({
          name,
          id,
          avatar,
        });
      }
      res.sendStatus(401);
    } catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  }
);

router.post("/logout", async (req, res) => {
  res.clearCookie("x-auth-token");
  res.cookie = null;
  res.sendStatus(200);
});


export default router;
