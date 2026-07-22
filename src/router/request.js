const express = require("express");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    const loggedInUser = req.loggedInUser;
    const fromUserId = loggedInUser?._id;
    const toUserId = req?.params?.toUserId;
    const status = req?.params?.status;
    try {
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const AllOWED_STATUS = ["ignore", "interested"];
      if (!AllOWED_STATUS.includes(status)) {
        return res.json({ message: "status is not valid" });
      }
      const isRequestAlreadyPresent = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (isRequestAlreadyPresent) {
        return res.json({ message: "Request already presentß" });
      }

      await connectionRequest.save();

      res.json({
        message: "Request send successfully !",
        data: connectionRequest,
      });
    } catch (error) {
      res.status(400).send("Error:" + error.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loginUser = req.loggedInUser;

      const Allowed_status = ["accepted", "rejected"];

      const { status, requestId } = req.params;

      if (!Allowed_status.includes(status)) {
        return res.json({ message: "Invalid status type" + status });
      }

      const isValidConnectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loginUser._id,
        status: "interested",
      });

      console.log(isValidConnectionRequest);

      if (!isValidConnectionRequest) {
        return res.status(404).json({
          message: "Connection request not found !!",
        });
      }
      isValidConnectionRequest.status = status;

      await isValidConnectionRequest.save();
      res.json({
        message: "Request " + status + " Successfully",
      });
    } catch (error) {
      res.send("Error :" + error.message);
    }
  },
);

module.exports = requestRouter;
