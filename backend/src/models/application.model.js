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

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },

    contactEmail: {
      type: String,
      required: true,
      trim: true,
    },

    skills: [
      {
        type: String,
        required: true,
        trim: true,
        maxlength: 10,
      },
    ],

    currentLocation: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      enum: ["FResher", "1", "2", "3", "4", "5"],
      required: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 50,
    },

    relocation: {
      type: Boolean,
      required: true,
    },

    workMode: {
      type: String,
      enum: ["remote", "on-site", "hybrid"],
      required: true,
    },

    coverLetter: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
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
