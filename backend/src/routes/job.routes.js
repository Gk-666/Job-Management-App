const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const protectRoute = require("../middlewares/auth.middleware");
const authorizeAdmin = require("../middlewares/role.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.get("/", jobController.getAllJobs);

router.get("/:jobId", jobController.getJobById);

router.post("/new-job", jobController.createJob)

router.patch(
  "/update/:jobId",
  protectRoute,
  authorizeAdmin("admin"),
  jobController.updateJob,
);

router.delete("/jobs/delete/:jobId", jobController.deleteJob);

module.exports = router
