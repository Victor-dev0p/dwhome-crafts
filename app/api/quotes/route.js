// app/api/quotes/route.js

import { connectToDB } from '@/lib/mongodb';
import Quote from '@/lib/models/Quote'
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// A simple utility function to validate an email address format.
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// A basic in-memory rate limiting store to prevent abuse.
// Note: This won't persist across server restarts or multiple instances.
const rateLimitStore = new Map();

// Helper function to extract the client's IP address from request headers.
function getClientIP(headers) {
  const xForwardedFor = headers.get('x-forwarded-for');
  return xForwardedFor ? xForwardedFor.split(',')[0] : 'unknown';
}

// Checks if a client is rate-limited based on IP address.
function isRateLimited(ip, maxRequests = 5, windowMs = 10 * 60 * 1000) {
  const currentTime = Date.now();
  const entry = rateLimitStore.get(ip) || { count: 0, timestamp: currentTime };

  if (currentTime - entry.timestamp > windowMs) {
    rateLimitStore.set(ip, { count: 1, timestamp: currentTime });
    return false;
  }

  if (entry.count >= maxRequests) return true;

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return false;
}

export async function POST(request) {
  try {
    // Apply rate limiting based on client IP.
    const ip = getClientIP(request.headers);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Connect to the MongoDB database.
    await connectToDB();

    // Parse the request body as JSON.
    const body = await request.json();

    // Destructure the fields, using the same names as your frontend.
    const { name, email, service, projectDetails, budget, message } = body;

    // Server-side validation for required fields.
    if (!name || !email || !service || !projectDetails) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, service, or projectDetails.' },
        { status: 400 }
      );
    }

    // Validate the email format.
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format. Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Convert the budget to a number if it exists.
    const numericBudget = budget ? Number(budget) : null;
    const formattedBudget = numericBudget
      ? `₦${numericBudget.toLocaleString()}`
      : 'Not specified';

    // Create a new quote document in the database.
    await Quote.create({
      name,
      email,
      service,
      projectDetails, // Use the correct variable name
      budget: numericBudget, // Store the budget as a number
      message,
    });

    // Configure nodemailer with your Gmail credentials.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Admin Notification Email
    await transporter.sendMail({
      from: `"Quote Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Quote Request',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Project Details:</strong> ${projectDetails}</p>
        <p><strong>Budget:</strong> ${formattedBudget}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `,
    });

    // Client Confirmation Email
    await transporter.sendMail({
      from: `"Brooklyn & Bronx" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Quote Received',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out about your <strong>${service}</strong> project. We’ve received your request and will get back to you shortly.</p>
        <p>– Brooklyn & Bronx</p>
      `,
    });

    // Return a success response.
    return NextResponse.json({ message: 'Quote submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('❌ Quote submission failed:', error);
    return NextResponse.json({ error: 'Failed to submit quote' }, { status: 500 });
  }
}

// Add this to app/api/quotes/route.js
export async function GET() {
  try {
    await connectToDB();
    const quotes = await Quote.find().sort({ createdAt: -1 });
    return NextResponse.json(quotes, { status: 200 });
  } catch (error) {
    console.error('❌ Failed to fetch quotes:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}
