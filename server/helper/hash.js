import bcrypt from "bcrypt";

// function to hash the password
export default async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    console.error(err.message);
    throw new Error("could not hash the password");
  }
};
