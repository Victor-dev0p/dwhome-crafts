import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name: String,
  message: String,
  location: String,
  project: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);