const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());
//sign up api
app.post("/signUp", async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ "error on save": err.message });
  }
});
//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(500).send({ "error on fetch": err.message });
  }
});

// feed api
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ "error on fetch": err.message });
  }
});

//delete user by email

app.delete("/delete", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const deeletedUser = await User.findOneAndDelete({ email: userEmail });
    if (!deeletedUser) {
      return res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send({ message: "User deleted successfully" });
    }
  } catch (err) {
    res.status(500).send({ "error on delete": err.message });
  }
});

//update user by email
app.patch("/update", async (req, res) => {
  const userId = req.body.userId;
  const updateData = req.body;

  try {
    const AllOWED_UPDATE = [
      "userId",
      "photoUrl",
      "age",
      "skills",
      "about",
      "gender",
    ];

    const isUpdateAllowed = Object.keys(updateData).every((k) =>
      AllOWED_UPDATE.includes(k),
    );
    if (!isUpdateAllowed) {
      res.send("Update not allowed");
    }
    if (updateData.skills.length > 10) {
      res.send("Update not allowed, skills should not more than 10");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updateData,

      { runValidators: true, new: true },
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send({ message: "User updated successfully" });
    }
  } catch (err) {
    res.status(500).send({ "error on update": err.message });
  }
});

//api to get user by email and update

app.patch("/updateByEmail", async (req, res) => {
  const userEmail = req.body.email;
  const data = req.body;

  console.log(data);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      data,
      { new: true },
    );
    console.log(updatedUser);

    res.send("user updated successfully");
  } catch (error) {
    res.send("something went worng", error);
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
