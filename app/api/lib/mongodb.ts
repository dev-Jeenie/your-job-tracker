import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongo;