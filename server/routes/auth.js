const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const authRouter = express.Router();

// authRouter.get("/user", async (req, res) => {
//   const email = "mohan@gmail.com";
//   const existingUser = await User.findOne({ email });

//   console.log("existing user ::::::::::::", existingUser);
//   res.send(existingUser);
// });

// SIGN UP
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exists!!!" });
    }

    const hashedPasswrod = await bcryptjs.hash(password, 8);

    let user = new User({
      name,
      email,
      password: hashedPasswrod,
    });

    user = await user.save();

    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;