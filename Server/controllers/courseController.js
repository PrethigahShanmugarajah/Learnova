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

/* -------- Get Course by ID -------- */
export const getCourseId = async (req, res) => {
  const { id } = req.params;
  try {
    const courseData = await Course.findById(id).populate({ path: "educator" });

    // Remove LecturelUrl if is PreviewFree is false
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lecturelUrl = "";
        }
      });
    });

    return res.status(200).json({ success: true, courseData });
  } catch (error) {
    console.error("Get Course by ID Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get Course by ID Error: ${error.message}`,
    });
  }
};
