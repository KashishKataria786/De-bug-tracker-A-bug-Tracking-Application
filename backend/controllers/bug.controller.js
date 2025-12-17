import BugModel  from "../models/bug.model.js";
import progressStages from '../utils/ProgressLevels.js'
import severityLevels from '../utils/SeverityLevels.js'



export const createBug = async (req, res) => {
  try {
    const {
      title,
      severity,
      description,
      progress,
      reporterName,
      estimatedFixTimeHours,
      dateReported,
    } = req.body;

    if (
      !title ||
      !severity ||
      !reporterName ||
      estimatedFixTimeHours === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // 🐞 Create bug
    const bug = await BugModel.create({
      title,
      severity,
      description,
      progress: progress || "Not Started",
      reporterName,
      estimatedFixTimeHours,
      dateReported: dateReported || Date.now(),
    });

    return res.status(201).json({
      success: true,
      message: "Bug created successfully",
      data: bug,
    });
  } catch (error) {
    console.error("Create Bug Error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllBugs= async(req,res)=>{
  try {
    const bugs = await BugModel.find().sort({created:-1});
    return res.status(200).send({success:true, message:"Got yourData ", data:bugs})

  } catch (error) {
    console.error("Retriving  Bug Errors:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export const changeProgressOfBug = async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;
  if(!progressStages.includes(progress))return res.status(400).send({success:false, message:"Wrong Entity"});

  if (!id || !progress) {
    return res.status(400).json({
      success: false,
      message: "Missing Bug ID or Progress status",
    });
  }

  try {
    const bug = await BugModel.findById(id);

    if (!bug) {
      return res.status(404).json({
        success: false,
        message: "Bug not found",
      });
    }

    bug.progress = progress;
    await bug.save(); // triggers pre-save hook for statusHistory

    return res.status(200).json({
      success: true,
      message: "Bug progress updated successfully",
      data: bug,
    });
  } catch (error) {
    console.error("Change Progress Error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteBug = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Bug ID is required",
    });
  }

  try {
    const deletedBug = await BugModel.findByIdAndDelete(id);

    if (!deletedBug) {
      return res.status(404).json({
        success: false,
        message: "Bug not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bug deleted successfully",
      data: deletedBug,
    });
  } catch (error) {
    console.error("Delete Bug Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Bug ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const PiChartAnalytics = async (req, res) => {
  try {
    const bugs = await BugModel.find({ isDeleted: false });

    const progressCountMap = {};

    bugs.forEach((bug) => {
      const stage = bug.progress;
      progressCountMap[stage] = (progressCountMap[stage] || 0) + 1;
    });

    const labels = Object.keys(progressCountMap);
    const data = Object.values(progressCountMap);

    return res.status(200).json({
      success: true,
      message: "Pie chart analytics fetched",
      data: {
        labels,
        data,
      },
    });

  } catch (error) {
    console.error("Pie Chart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateBug = async (req, res) => {
  const { id } = req.params;

  try {
    const allowedUpdates = [
      "title",
      "description",
      "progress",
      "estimatedFixTimeHours",
    ];

    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided to update",
      });
    }

    const bug = await BugModel.findById(id);
    if (!bug) {
      return res.status(404).json({
        success: false,
        message: "Bug not found",
      });
    }

    // Apply updates
    Object.keys(updates).forEach((key) => {
      bug[key] = updates[key];
    });

    await bug.save(); 

    return res.status(200).json({
      success: true,
      message: "Bug updated successfully",
      data: bug,
    });

  } catch (error) {
    console.error("Update Bug Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Bug ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

