import { Schema, model, models } from "mongoose";

const chartSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    prompt: { type: String, required: true },
    mermaidCode: { type: String, required: true },
  },
  { timestamps: true },
);
const Chart = models.Chart || model("Chart", chartSchema);
export default Chart;
