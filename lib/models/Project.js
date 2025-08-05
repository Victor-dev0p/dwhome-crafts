import mongoose from 'mongoose';
import { string } from 'zod';

const projectSchema = new mongoose.Schema({
  description: String,
  image: Buffer,
  contentType: String,
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
