const mongoose = require("mongoose");
import { Error } from "mongoose";
const DB_URL = process.env.DATABASE_URL;

console.log("db-url", DB_URL);
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err:Error) => {
    console.error("Database connection error:", err);
  });

module.exports = mongoose.connection;
