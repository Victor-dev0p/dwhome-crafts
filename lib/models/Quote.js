// lib/models/Quote.js - WORKING VERSION
import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  service: {
    type: String,
    required: true,
    trim: true
  },
  projectDetails: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    default: '',
    trim: true
  },
  currency: { 
    type: String, 
    enum: ['NGN', 'USD'], 
    required: true,
    default: 'NGN'
  },
  budgetRaw: { 
    type: Number, 
    required: true,
    default: 0
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Prevent model overwrite issue in Next.js hot reload
export default mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);