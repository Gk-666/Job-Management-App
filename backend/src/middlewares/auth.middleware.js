const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized user.",
      });
    }

    const token = authHeader.split(" ")[1];
    // console.log(token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);
    if(!decoded){
      return res.status(401).json({
        message:"Unauthorized user."
      })
    }

    const user = await User.findById(decoded.id).select("-password");
    // console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      meassage: "Not Authorized.",
    });
  }
};

module.exports = protectRoute;
