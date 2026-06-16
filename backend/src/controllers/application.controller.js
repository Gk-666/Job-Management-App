const mongoose = require("mongoose");
const Application = require("../models/application.model");
const Job = require("../models/job.model");
const { uploadFile } = require("../services/storage.service");

const createJobApplication = async (req, res) => {
  const { jobId } = req.params;
  const { skills, qualification, currentLocation, mobileNumber } = req.body;

  const resume = req.file;

  console.log("Multer resume file...olala : ", resume);

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      message: "Invalid job id",
    });
  }

  if (!qualification || !currentLocation || !mobileNumber || !resume) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  if (!skills || skills.length === 0 || !Array.isArray(skills)) {
    return res.status(400).json({
      message: "At least one skill is required.",
    });
  }

  try {
    const job = await Job.findOne({
      _id: jobId,
      status: "Open",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    const existingApplication = await Application.findOne({
      applicant: req.user._id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(409).json({
        message: "Already Applied for the job.",
      });
    }

    const uploadedResume = await uploadFile(file.buffer.toString("base64"));

    const newApplication = await Application.create({
      applicant: req.user._id,
      job: jobId,
      skills,
      qualification,
      currentLocation,
      mobileNumber,
      resumeUrl: uploadedResume.url,
    });

    return res.status(201).json({
      message: "Application for job is successful.",
      application: newApplication,
      resume: req.file,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to submit application.",
      error: error.message,
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate("job", "title company location salary status")
      .sort({ createdAt: -1 });

    if (applications.length === 0) {
      return res.status(200).json({
        message: "No application Found.",
      });
    }

    return res.status(200).json({
      message: "Applications fetched successfully.",
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch applications.",
      error: error.message,
    });
  }
};

const getApplicationsForJob = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      message: "Invalid job id.",
    });
  }

  try {
    const applications = await Application.find({
      job: jobId,
    })
      .populate("applicant", "name email qualification")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Applications fetched successfully.",
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch applications.",
      error: error.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid application id.",
    });
  }

  try {
    const updatedStatusApplication = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updatedStatusApplication) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      message: "Application status updated successfully.",
      updatedStatusApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update status.",
      error: error.message,
    });
  }
};

module.exports = {
  createJobApplication,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
};
