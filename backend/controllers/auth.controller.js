const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie.js");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);
    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      todos: newUser.todos,
    });
  } catch (error) {
    console.log("error in signup controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compare(password, user?.password)) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      todos: user.todos,
    });
  } catch (error) {
    console.log("error in login controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getMe = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });   
  } catch (error) {
    console.log("error in getMe controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signup, login, logout, getMe };
