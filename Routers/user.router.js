const express = require("express");
const userRouter = express.Router();
const userService = require("../BL/user.services");
const { sendError } = require("../errController");
userRouter.post("/login", async (req, res) => {
  try {
    const token = await userService.login(req.body);
    const user = await userService.getUser(req.body.email);
    res.send({ token, user });
  } catch (err) {
    sendError(res, err);
  }
});
userRouter.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const user = await userService.createUser(
      req.body
    );
    res.send(user);
  } catch (err) {
    sendError(res, err);
  }
});

module.exports = userRouter;
