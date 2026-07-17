const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignupApi } = require("../utils/validations");
const { userAuth } = require("../middleware/auth");
const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
  const { firstName, age, lastName, email, password, skills, about, photoUrl } =
    req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    skills,
    about,
    photoUrl,
    age,
    password: hashPassword,
  });

  try {
    validateSignupApi(req);

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ "error on save": err.message });
  }
});
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Credential !!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      console.log(token);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });

      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send("Error :" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successful");
});

module.exports = authRouter;
