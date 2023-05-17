require('dotenv').config()
require("./DL/db").connect()
const express = require("express");
const app = express();
const PORT = 5556;
const cors = require("cors");
const mainRouter = require("./Routers");
const fs = require("fs");
const { log } = require('console');
app.use(express.json());
app.use(cors());

app.use("/uploads",express.static("./uploads"))
app.use("/api", mainRouter);
app.listen(PORT, () => {
  if(!fs.existsSync("./uploads"))fs.mkdirSync("./uploads")
  console.log("Server is running : listening to port " + PORT);
});
