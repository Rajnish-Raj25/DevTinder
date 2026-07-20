const mongoose = require("mongoose");

const connectionRequestModel = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestModel.index({ fromUserId: 1, toUserId: 1 });

connectionRequestModel.pre("save", async function () {
  const currentUser = this;
  if (currentUser.fromUserId?.equals(currentUser.toUserId)) {
    throw new Error("Connection request can't send to yourself");
  }
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestModel,
);

module.exports = ConnectionRequestModel;
