const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 30,
    },

    company: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 20,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: String,
      required:true,
      trim:true
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    skillsRequired: [
      {
        type: String,
        required: true,
      },
    ],

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      require: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Open", "Close"],
      default: "Open",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
