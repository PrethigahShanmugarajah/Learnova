// Learnova / Server / models / Purchase.js
import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      defaul: "pending",
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
