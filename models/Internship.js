import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Applied", "Interview", "Rejected", "Offer"],
      default: "Applied",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    reminderDate: {
      type: Date,
    },

    notes: {
      type: String,
    },

    jobLink: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;