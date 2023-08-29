require("dotenv").config();
const cors = require("cors");
const express = require("express");
const todoRoutes = require("./Routes/TodoRoutes");
const userRoutes = require("./Routes/userRoutes");
const db = require("./DB/DbConnection");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use("/", todoRoutes);
app.use("/", userRoutes);

const PORT = process.env.PORT || 3000;
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
