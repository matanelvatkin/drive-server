const express = require("express");
const userRouter = require("./user.router");
const documentRouter = require("./documents.router");
const mainRouter = express.Router();

mainRouter.use("/user",userRouter)
mainRouter.use("/document",documentRouter)

module.exports = mainRouter