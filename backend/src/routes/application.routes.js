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
  getApplicationById,
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

router.get("/:jobId", protect, authorizeRoles("admin"), getApplicationsForJob);

router.get("/:id/details", protect, authorizeRoles("admin"), getApplicationById);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  updateApplicationStatus,
);

module.exports = router;
