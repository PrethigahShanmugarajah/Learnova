// Learnova / Server / controllers / userController.js.js
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";
import Stripe from "stripe";

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

/* -------- Purchase Course -------- */
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;
    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.json({ success: false, message: "Data not found" });
    }

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: (
        courseData.coursePrice -
        (courseData.discount * courseData.coursePrice) / 100
      ).toFixed(2),
    };

    const newPurchase = await Purchase.create(purchaseData);

    // Stripe Gateway Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const currency = process.env.CURRENCY.toLowerCase();

    // Creating line items to for Stripe
    const line_items = [
      {
        price_data: {
          currency,
          product_data: { name: courseData.courseTitle },
          unit_amount: Math.floor(newPurchase.amount) * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      // success_url: `${origin}/loading/my-enrollments`,
      // cancel_url: `${origin}/`,
      success_url: `${origin.replace(/\/$/, "")}/loading/my-enrollments`,
      cancel_url: `${origin.replace(/\/$/, "")}/`,
      line_items: line_items,
      mode: "payment",
      metadata: { purchaseId: newPurchase._id.toString() },
    });

    return res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Purchase Course Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Purchase Course Error: ${error.message}`,
    });
  }
};
