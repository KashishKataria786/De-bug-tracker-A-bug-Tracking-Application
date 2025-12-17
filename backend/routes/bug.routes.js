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

const bugRouter = express.Router();

bugRouter.post("/create-bug", createBug);
bugRouter.get("/get-bugs", filterAllbugs);
bugRouter.delete('/delete/:id', deleteBug);
bugRouter.get('/pie-chart-analytics', PiChartAnalytics);
bugRouter.patch('/update-bug/:id', updateBug);
bugRouter.patch("/change-progress/:id", changeProgressOfBug);

export default bugRouter;
