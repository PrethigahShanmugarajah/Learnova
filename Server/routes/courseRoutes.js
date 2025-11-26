// Server / routes / courseRoutes.js
import express from "express";
import { getAllCourse } from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.get("/all", getAllCourse);

export default courseRouter;
