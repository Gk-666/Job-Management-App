const Job = require("../models/job.model");
const Application = require("../models/application.model");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalJobs,
      totalApplications,
      totalJobsByStatus,
      applicationsByStatus,
      topSkills,
      recentJobs,
    ] = await Promise.all([
      Job.countDocuments(),
      Application.countDocuments(),
      Job.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
      Application.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
      Application.aggregate([
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
      ]),
      await Job.find()
        .select("title company status createdAt _id")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    return res.status(200).json({
      totalApplications,
      totalJobs,
      applicationsByStatus,
      totalJobsByStatus,
      topSkills,
      recentJobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch stats.",
      error: error.message,
    });
  }
};

module.exports = { getDashboardStats };
