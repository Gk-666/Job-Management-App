const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const auhtorizeRoles = require("../middlewares/role.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const dasboardController = require("../controllers/dashboard.controller");

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  dasboardController.getDashboardStats,
);

module.exports = router;
