const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupApi } = require("./utils/validations");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");
require("dotenv").config();
const app = express();

app.use(cookieParser());

app.use(express.json());

app.post("/signUp", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const userProfile = req?.loggedInUser;

    res.status(200).send(userProfile);
  } catch (error) {
    res.status(500).send("Error :" + error.message);
  }
});

app.post("/sendConectionReq", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.loggedInUser;
    res.send(loggedInUser?.firstName + " send connection request");
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });
