const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/request", userAuth, async (req, res) => {
  try {
    const loginUser = req.loggedInUser;
    const allConnection = await ConnectionRequestModel.find({
      toUserId: loginUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ]);

    if (!allConnection) {
      return res.json({ message: "No request available " });
    }
    res.json({ message: "Request fount", data: allConnection });
  } catch (error) {
    res.send("Error :" + error.message);
  }
});

module.exports = userRouter;
