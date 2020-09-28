import jwt from "jsonwebtoken";

// function to verify if a jwt token is valid
export default async (token) => {
  try {
    return await jwt.verify(token["x-auth-token"], process.env.PRIVATE_key);
  } catch (err) {
    throw new Error(err.message);
  }
};
