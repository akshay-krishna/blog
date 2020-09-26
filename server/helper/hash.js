import bcrypt from "bcrypt";

const hash = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    console.error(err.message);
    throw new Error("could not hash the password");
  }
};

export default hash;
