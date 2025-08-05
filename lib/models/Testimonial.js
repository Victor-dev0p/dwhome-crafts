import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: String,
  text: String,
  location: String,
  project: String,
  rating: Number,
  image: Buffer,
  contentType: String,
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
