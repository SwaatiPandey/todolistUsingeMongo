const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const router = require("./routes/todoRoutes");
const { config } = require("process");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todoList", router);
app.listen(process.env.PORT, console.log(`app started on ${process.env.PORT}`));
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, connection) => {
    if (err) {
      console.log(err);
      return console.log("Error in connecting to database");
    }
  }
);
