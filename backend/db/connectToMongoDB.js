import mongoose from "mongoose";

// Initialize a flag to track the connection status
let isMongoDBConnected = false;
const connectToMongoDB = async () => {
  try {
    if (!isMongoDBConnected) {
      // Check if the connection is already established
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
      } else {
        console.log("Already connected to MongoDB");
      }
      isMongoDBConnected = true; // Set the flag to true
    }
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

// Handle graceful shutdown
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed gracefully");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection", error.message);
    process.exit(1);
  }
});

export default connectToMongoDB;
