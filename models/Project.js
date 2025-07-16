import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
