import mongoose from "mongoose";

function initDB() {
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Database successfully connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error occurred", err);
  });
}

export default initDB;
