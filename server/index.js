// packages
import express from "express";
import cookieParser from "cookie-parser";
import connectDb from "./helper/db.js";
import cors from "cors";
// routes
import post from "./routes/posts.js";
import comment from "./routes/comments.js";
import user from "./routes/user.js";
import auth from "./routes/auth.js";
// Initalizing the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// port
const { PORT } = process.env;

// connecting the db
connectDb();

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

app.use("/user", user);
app.use("/auth", auth);
app.use("/post", post);
app.use("/post/comment", comment);

app.get("*", (req, res) => {
  res.sendStatus(404);
});

// Initializing the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
