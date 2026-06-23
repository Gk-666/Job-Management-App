const mongoose = require("mongoose");
const Application = require("../models/application.model");
const Job = require("../models/job.model");
const { uploadFile } = require("../services/storage.service");
const User = require("../models/user.model");

const createJobApplication = async (req, res) => {
  const { jobId } = req.params;

  const {
    mobileNumber,
    gender,
    currentLocation,
    qualification,
    experience,
    workMode,
    relocation,
    coverLetter,
  } = req.body;

  const skills = JSON.parse(req.body.skills);

  const resume = req.file;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(400).json({
      message: "User not found try logging in again.",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      message: "Invalid job id",
    });
  }

  if (
    !qualification ||
    !currentLocation ||
    !mobileNumber ||
    !resume ||
    !workMode ||
    !relocation ||
    !experience ||
    !gender ||
    !coverLetter
  ) {
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
        message: "Already applied for the job.",
      });
    }

    const uploadedResume = await uploadFile(resume.buffer.toString("base64"));

    const newApplication = await Application.create({
      applicant: req.user._id,
      job: jobId,
      gender,
      experience,
      skills,
      qualification,
      currentLocation,
      contactEmail: user.email,
      workMode,
      relocation,
      coverLetter,
      mobileNumber,
      resumeUrl: uploadedResume.url,
    });

    return res.status(201).json({
      message: "Application for job is successfully submitted.",
      application: newApplication._id,
    });
  } catch (error) {
    console.log(error);
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

  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json({
      message: "Job not found.",
    });
  }

  try {
    const applications = await Application.find({
      job: jobId,
    })
      .populate("applicant", "firstName lastName")
      .select("status createdAt applicant")
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

const getApplicationById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid application.",
    });
  }

  try {
    const application = await Application.findById(id).populate(
      "applicant",
      "firstName lastName",
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      message: "Application details fetched successfully.",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch application details.",
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
  getApplicationById,
};
