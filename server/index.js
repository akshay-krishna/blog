// packages
import express from "express";
import connectDb from "./helper/db.js";

// routes
import post from "./routes/posts.js";

// Initalizing the app
const app = express();

// Middleware
app.use(express.json());

// port
const { PORT } = process.env;

// connecting the db
connectDb();

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

app.use("/post", post);

// Initializing the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));