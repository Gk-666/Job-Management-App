const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const protectRoute = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.get("/", jobController.getAllJobs);
router.post(
  "/",
  protectRoute,
  authorizeRoles("admin"),
  jobController.createJob,
);
router.get(
  "/my-jobs",
  protectRoute,
  authorizeRoles("admin"),
  jobController.getAdminJobs,
);

router.get("/:jobId", jobController.getJobById);
router.patch(
  "/:jobId",
  protectRoute,
  authorizeRoles("admin"),
  jobController.updateJob,
);
router.delete(
  "/:jobId",
  protectRoute,
  authorizeRoles("admin"),
  jobController.deleteJob,
);

module.exports = router;
