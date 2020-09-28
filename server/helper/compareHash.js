import bcrypt from "bcrypt";

// function to compare hashed passwords
export default async (plainPasswd, hashPasswd) => {
  try {
    return await bcrypt.compare(plainPasswd, hashPasswd);
  } catch (err) {
    console.error(err.message);
  }
};
