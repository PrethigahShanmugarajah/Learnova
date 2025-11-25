// Server / routes / educatorRoutes.js
import express from "express";
import {
  addCourse,
  getEducatorCourses,
  updateRoleEducator,
} from "../controllers/educatorController.js";
import upload from "../configs/multer.js";
import { protectEducator } from "../middleware/authMiddleware.js";

const educatorRouter = express.Router();

educatorRouter.get("/update-role", updateRoleEducator);
educatorRouter.post(
  "/add-course",
  upload.single("image"),
  protectEducator,
  addCourse
);
educatorRouter.get("/courses", protectEducator, getEducatorCourses);

export default educatorRouter;
