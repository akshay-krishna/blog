import verifyToken from "../helper/verifyToken.js";

// middleware to check if the user is authentic
export default async (req, res, next) => {
  try {
    const { id } = await verifyToken(req.cookies);
    req.uid = id;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
