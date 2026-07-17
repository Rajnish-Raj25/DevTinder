const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();
requestRouter.post("/sendConectionReq", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.loggedInUser;
    res.send(loggedInUser?.firstName + " send connection request");
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

module.exports = requestRouter;
