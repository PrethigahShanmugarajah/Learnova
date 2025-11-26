// Learnova / Server / models / CourseProgress.js
import mongoose from "mongoose";

const courseProgressSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    completed: { type: Boolean, required: true },
    lectureCompleted: [],
  },
  { minimize: false }
);

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);

export default CourseProgress;
