import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, enum: ["free", "pro"], default: "free" },
    usageCount: { type: Number, default: 0 }, // track usage for free tier
  },
  { timestamps: true },
);
export default models.User || model("User", userSchema);
