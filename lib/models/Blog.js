import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  excerpt: { type: String }, // Optional short description
  content: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);