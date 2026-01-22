import express from "express";
import {
  changeProgressOfBug,
  createBug,
  deleteBug,
  PiChartAnalytics,
  getAllBugs,
  updateBug,
  filterAllbugs
} from "../controllers/bug.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const bugRouter = express.Router();

bugRouter.post("/create-bug", createBug);
bugRouter.get("/get-bugs",authMiddleware, filterAllbugs);
bugRouter.delete('/delete/:id',authMiddleware, deleteBug);
bugRouter.get('/pie-chart-analytics',authMiddleware, PiChartAnalytics);
bugRouter.patch('/update-bug/:id',authMiddleware, updateBug);
bugRouter.patch("/change-progress/:id",authMiddleware, changeProgressOfBug);

export default bugRouter;
