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
