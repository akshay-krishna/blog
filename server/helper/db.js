import mongoose from "mongoose";

// Function to connect to the db
export default async () => {
  const { DB_PASSWORD, DB_NAME } = process.env;
  const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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
