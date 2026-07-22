const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const user = require("../models/user");
const userRouter = express.Router();

const user_public_data = [
  "firstName",
  "lastName",
  "photoUrl",
  "about",
  "gender",
  "age",
  "skills",
];

userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loginUser = req.loggedInUser;
    const allConnection = await ConnectionRequestModel.find({
      toUserId: loginUser._id,
      status: "interested",
    }).populate("fromUserId", user_public_data);

    if (!allConnection) {
      return res.json({ message: "No request available " });
    }
    res.json({ message: "Request fount", data: allConnection });
  } catch (error) {
    res.send("Error :" + error.message);
  }
});

userRouter.get("/user/request/connections", userAuth, async (req, res) => {
  try {
    const loginUser = req.loggedInUser;

    const allConnections = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loginUser._id, status: "accepted" },
        { fromUserId: loginUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", user_public_data)
      .populate("toUserId", user_public_data);

    if (!allConnections) {
      return res.json({ message: "Connections not found !!" });
    }

    const data = allConnections.map((row) => {
      if (row.fromUserId.toString() === loginUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.json({ message: "Connections request found", data: data });

    //get all connections
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  const page = req.query.page || 1;
  let limit = req.query.limit || 10;

  console.log(page, limit);

  let skip = (page - 1) * limit;
  limit = limit > 50 ? 50 : limit;
  try {
    const loginUser = req.loggedInUser;
    const connrectonRequest = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loginUser._id },
        {
          toUserId: loginUser._id,
        },
      ],
    }).select("fromUserId toUserId");

    const userToHideforFeed = new Set();

    connrectonRequest.map((user) => {
      return (
        userToHideforFeed.add(user.fromUserId.toString()),
        userToHideforFeed.add(user.toUserId.toString())
      );
    });

    const feedData = await user
      .find({
        $and: [
          {
            _id: { $nin: Array.from(userToHideforFeed) },
          },
          {
            _id: { $ne: loginUser._id },
          },
        ],
      })
      .select(user_public_data)
      .skip(skip)
      .limit(limit);

    res.json({ data: feedData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
