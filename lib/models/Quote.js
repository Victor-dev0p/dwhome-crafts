import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  projectDetails: String,
  message: String,
  currency: { type: String, enum: ['NGN', 'USD'], required: true },
  budgetRaw: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent model overwrite issue in Next.js hot reload
export default mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);
