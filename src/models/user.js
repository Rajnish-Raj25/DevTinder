const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Error saving in email" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Error saving in password" + value);
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      validate: (value) => {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Something went wrong ");
        }
      },
    },

    photoUrl: {
      type: String,
      default: "https://bup.edu.bd/public/upload/user-dummy.jpeg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Error saving in  photourl" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is the default aboot of the user",
      minLength: 25,
      maxLength: 150,
    },

    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
