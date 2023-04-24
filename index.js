require("./DL/db").connect()
require('dotenv').config()
const express = require("express");
const app = express();
const PORT = 5555;
const cors = require("cors");
const mainRouter = require("./Routers");
const fs = require("fs");
app.use(express.json());
app.use(cors());

app.use("/api", mainRouter);
app.listen(PORT, () => {
  if(!fs.existsSync("./uploads"))fs.mkdirSync("./uploads")
  console.log("Server is running : listening to port " + PORT);
});
