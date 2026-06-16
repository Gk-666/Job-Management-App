const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");
const {
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
  createJobApplication,
} = require("../controllers/application.controller");

router.post(
  "/:jobId",
  protect,
  authorizeRoles("applicant"),
  upload.single("resume"),
  createJobApplication,
);

router.get(
  "/my-applications",
  protect,
  authorizeRoles("applicant"),
  getMyApplications,
);

router.get(
  "/applications/job/:jobId",
  protect,
  authorizeRoles("admin"),
  getApplicationsForJob,
);

router.get("/:id/status", protect, updateApplicationStatus);

module.exports = router;
