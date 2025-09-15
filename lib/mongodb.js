// lib/mongodb.js - SIMPLIFIED VERSION (Replace your current one)
import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  // Set mongoose options to prevent warnings
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'dwhDB',
      // Only include options that definitely work
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};