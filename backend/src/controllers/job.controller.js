const { default: mongoose } = require("mongoose");
const Job = require("../models/job.model");

const createJob = async (req, res) => {
  const {
    title,
    company,
    location,
    salary,
    description,
    skillsRequired,
    experience,
    employmentType,
  } = req.body;

  if (
    !title ||
    !company ||
    !location ||
    !salary ||
    !description ||
    !experience ||
    !employmentType
  ) {
    return res.status(400).json({
      message: "All field are required.",
    });
  }

  if (
    !skillsRequired ||
    !Array.isArray(skillsRequired) ||
    skillsRequired.length === 0
  ) {
    return res.status(400).json({
      message: "At least one skill is required.",
    });
  }

  try {
    const job = await Job.create({
      title,
      company,
      location,
      salary,
      experience,
      employmentType,
      skillsRequired,
      description,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: "Job created successfully.",
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create job.",
      error: error.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      status: "Open",
    })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");

    return res.status(200).json({
      message: "Jobs fetched successfully.",
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch jobs.",
      error: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job id." });
  }

  try {
    const job = await Job.findById(jobId).populate("createdBy", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      message: "Job fetched successfully.",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch job.",
      error: error.message,
    });
  }
};

const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Jobs fetched successfully.",
      jobs,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      message: "Invalid joib id.",
    });
  }

  delete updates.createdBy;
  delete updates._id;

  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      message: "Job updated successfully.",
      job: updatedJob,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update job.",
      error: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      message: "Invalid Job id.",
    });
  }

  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    return res.status(204).josn({
      message: "Job deleted successfully.",
      deletedJob,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete job.",
      error: error.message,
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getAdminJobs,
};
