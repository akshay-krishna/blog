import jwt from "jsonwebtoken";

// function to generate a twt token
export default async ({ email, id, admin }) => {
  try {
    return await jwt.sign(
      { email, id, admin, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      process.env.PRIVATE_key
    );
  } catch (err) {
    console.error(err.message);
  }
};
