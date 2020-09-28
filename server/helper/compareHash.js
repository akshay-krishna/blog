import bcrypt from "bcrypt";

export default async (plainPasswd, hashPasswd) => {
  try {
    return await bcrypt.compare(plainPasswd, hashPasswd);
  } catch (err) {
    console.error(err.message);
  }
};
