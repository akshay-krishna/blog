const express = require("express");
const connectDb = require("./helper/db");
const app = express();

// Middleware
app.use(express.json());

// port
const { PORT } = process.env;

// connecting the db
connectDb();
// Routes
app.get("/", (req, res) => {
  console.log(req.body);
  res.json({ msg: "hello" });
});

// Initializing the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
