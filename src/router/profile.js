const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleware/auth");
const {
  profileEditValidations,
  resetPasswordValidation,
} = require("../utils/validations");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const userProfile = req?.loggedInUser;

    res.status(200).send(userProfile);
  } catch (error) {
    res.status(500).send("Error :" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isAllowedUdate = profileEditValidations(req);

    console.log(isAllowedUdate);

    if (!isAllowedUdate) {
      throw new Error("Update now allowed");
    }

    const loginUser = req.loggedInUser;
    console.log("test1", loginUser);

    Object.keys(req.body).forEach((key) => (loginUser[key] = req.body[key]));

    loginUser.save();

    res.status(201).send("Profile updated successfully");
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

profileRouter.patch("/profile/resetpassword", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword, newPasswoed } = req.body;
    const currentLoginUser = req.loggedInUser;
    const hashedPass = currentLoginUser?.password;
    const passwordToSet = newPassword ?? newPasswoed;

    req.body.newPassword = passwordToSet;

    await resetPasswordValidation(req, hashedPass);

    const updatedPassWoed = await bcrypt.hash(passwordToSet, 10);

    currentLoginUser.password = updatedPassWoed;
    await currentLoginUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

module.exports = profileRouter;
