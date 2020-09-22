import mongoose from "mongoose";

const connectDb = async () => {
  const { DB_PASSWORD, DB_NAME } = process.env;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(
      `mongodb+srv://admin:${DB_PASSWORD}@cluster0.rxd7j.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      options
    );
    console.log("connected to the db");
  } catch (err) {
    console.error("failed to connect to the db");
    console.error(err.message);
  }
};

// module.exports = connectDb;
export default connectDb;
