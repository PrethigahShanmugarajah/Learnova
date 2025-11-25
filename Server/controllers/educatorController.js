// Learnova / Server / controllers / educatorController.js
import { clerkClient } from "@clerk/express";

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
