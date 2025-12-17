import mongoose from "mongoose";

const progressStages = [
  "Not Started",
  "In Development",
  "In Code Review",
  "In QA",
  "Ready for Release",
  "Live",
];

const severityLevels = [
  "Critical",
  "High",
  "Medium",
  "Low",
  "Trivial",
];

const statusHistorySchema = new mongoose.Schema(
  {
    stage: {
      type: String,
      enum: progressStages,
      required: true,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const bugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },

    description: {
      type: String,
      trim: true,
    },

    severity: {
      type: String,
      enum: severityLevels,
      required: true,
      index: true,
    },

    progress: {
      type: String,
      enum: progressStages,
      default: "Not Started",
      index: true,
    },

    reporterName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    estimatedFixTimeHours: {
      type: Number,
      min: 0,
      required: true,
    },

    dateReported: {
      type: Date,
      default: Date.now,
      index: true,
    },

    statusHistory: {
      type: [statusHistorySchema],
      default: [{ stage: "Not Started" }],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Track progress history
 */
bugSchema.pre("save", async function () {
  if (this.isModified("progress")) {
    this.statusHistory.push({
      stage: this.progress,
    });
  }
});

export default mongoose.model("BugModel", bugSchema);
