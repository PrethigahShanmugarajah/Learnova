// Learnova / Server / controllers / userController.js.js
import User from "../models/User.js";

/* -------- Get User Data -------- */
export const getUserData = async (req, res) => {
  try {
    const userid = req.auth.userId;
    const user = await User.findById(userid);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get User Data Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get User Data Error: ${error.message}`,
    });
  }
};

/* -------- Users Enrolled Courses With Lecture Links -------- */
export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate("enrolledCourses");

    return res
      .status(200)
      .json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    console.error(
      "Users Enrolled Courses With Lecture Links Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: `Users Enrolled Courses With Lecture Links Error: ${error.message}`,
    });
  }
};
