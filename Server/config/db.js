const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/FutsalBookingSystem");
    console.log("Database Connected Successfully");
  } catch (e) {
    console.error("MongoDb connection Error: ", e);
    process.exit(1);
  }
};

module.exports = connectionDB;
