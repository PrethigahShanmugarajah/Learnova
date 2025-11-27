import { clerkClient } from "@clerk/express";

// Product Educator Routes
export const protectEducator = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const response = await clerkClient.users.getUser(userId);

    if (response.publicMetadata.role !== "educator") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized Access" });
    }

    next();
  } catch (error) {
    console.error("Product Educator Routes Error:", error.message);

    return res.status(500).json({
      success: false,
      message: `Product Educator Routes Error: ${error.message}`,
    });
  }
};
