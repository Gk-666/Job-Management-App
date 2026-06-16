const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required...",
    });
  }

  try {
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hash,
    });

    return res.status(201).json({
      message: "User created Successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed To create user : ${error.message}`,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    // res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: validUser._id,
        name: validUser.name,
        email: validUser.email,
        role: validUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: `Login Failed : ${error.message}`,
    });
  }
};

module.exports = { register, login };
