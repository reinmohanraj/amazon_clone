const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.get("/user", async (req, res) => {
  const email = "logan@gmail.com";
  const existingUser = await User.findOne({ email });

  console.log("existing user ::::::::::::", existingUser);
  res.send(existingUser);
});

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

//SIGN IN ROUTE
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "USer with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "Incorrect Password." });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");

    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
