import jwt from "jsonwebtoken";

const token = async (email, id, admin) => {
  try {
    return await jwt.sign({ email, id, admin }, process.env.PRIVATE_key);
  } catch (err) {
    console.error(err.message);
  }
};

export default token;
