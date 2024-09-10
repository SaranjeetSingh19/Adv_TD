import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is connected with host ${connection.connection.host} 🚀`);
  } catch (error) {
    console.error(`Error in MongoDb Connection ${error}`);
    process.exit(1); 
  }
};
