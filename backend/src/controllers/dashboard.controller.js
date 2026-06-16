const Job = require("../models/job.model");
const Application = require("../models/application.model");

const getDashboardStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    const applicationsByStatus = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const topSkills = await Application.aggregate([
      { $unwind: "$skills" },
      {
        $group: {
          _id: "$skills",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      { $limit: 5 },
    ]);

    return res.status(200).json({
      totalApplications,
      totalJobs,
      applicationsByStatus,
      topSkills
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch stats.",
      error: error.message,
    });
  }
};

module.exports = { getDashboardStats };
