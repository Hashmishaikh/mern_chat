import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Error Connection in db", error.message);
  }
};

export default connectToMongoDb;
