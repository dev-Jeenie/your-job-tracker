import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected");
    return;
  }
  await mongoose.connect("mongodb://localhost:27017/JobTrackerDB");
  console.log("Connected");
};

export default connectMongo;
