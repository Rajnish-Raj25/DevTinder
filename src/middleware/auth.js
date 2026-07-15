const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Tokenß");
    }

    const isTokenValid = await jwt.verify(token, process.env.SECRET_kEY);
    const { _id } = isTokenValid;
    const loggedInUser = await user.findById(_id);
    if (!loggedInUser) {
      throw new Error("User not found");
    }
    req.loggedInUser = loggedInUser;
    next();
  } catch (error) {
    res.status(500).send("Error :" + error.message);
  }
};
module.exports = { userAuth };
