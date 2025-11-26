// Learnova / Server / controllers / courseController.js.js
import Course from "../models/Course.js";

/* -------- Get All Courses -------- */
export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });

    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Get All Courses Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get All Courses Error: ${error.message}`,
    });
  }
};
