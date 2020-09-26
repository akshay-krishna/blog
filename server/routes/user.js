import express from "express";

const router = express.Router();

// get all the user
router.get("/", (req, res) => {
  res.sendStatus(200);
});
// Create a user
router.post("/", async (req, res) => {});
//AUTH: Get the user data
router.get("/:id", async (req, res) => {});
// AUTH: Update a user
router.put("/:id", async (req, res) => {});
// AUTH: Delete a user
router.delete("/:id", async (req, res) => {});

export default router;
