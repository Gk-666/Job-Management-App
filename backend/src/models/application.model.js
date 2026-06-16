const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    skills: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    qualification: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
    },

    currentLocation: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Shortlisted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
