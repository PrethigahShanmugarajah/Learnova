// Learnova / Server / controllers / educatorController.js
import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

/* -------- Update Role to Educator -------- */
export const updateRoleEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "You can publish a course now!" });
  } catch (error) {
    console.error("Update Role to Educator Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Update Role to Educator Error: ${error.message}`,
    });
  }
};

/* -------- Add New Course -------- */
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Thumbnail Not Attached" });
    }

    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    return res
      .status(201)
      .json({ success: true, message: "Course Added!", course: newCourse });
  } catch (error) {
    console.error("Add New Course Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Add New Course Error: ${error.message}`,
    });
  }
};

/* -------- Get Educator Courses -------- */
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Get Educator Courses Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get Educator Courses Error: ${error.message}`,
    });
  }
};

/* -------- Get Educator Dashboard Data (Total Earning, Enrolled Students, No of Courses) -------- */
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);

    // Calculate total earnings from purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    //Collect unique enrolled student IDs with their course titles
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }
    res.json({
      success: true,
      dashboardData: { totalEarnings, enrolledStudentsData, totalCourses },
    });
  } catch (error) {
    console.error("Get Educator Dashboard Data Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Get Educator Dashboard Data Error: ${error.message}`,
    });
  }
};
