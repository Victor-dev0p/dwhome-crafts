// app/api/quotes/route.js
import { connectToDB } from '@/lib/mongodb';
import Quote from '@/lib/models/Quote';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const rateLimitStore = new Map();

function getClientIP(headers) {
  const xForwardedFor = headers.get('x-forwarded-for');
  return xForwardedFor ? xForwardedFor.split(',')[0] : 'unknown';
}

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

// Initialize transporter with environment check (FIXED)
const initializeTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailHost = process.env.EMAIL_SERVER_HOST;
  const emailPort = process.env.EMAIL_SERVER_PORT;

  console.log("🔍 Email config check:", {
    emailUser: emailUser ? "✅ Set" : "❌ Missing",
    emailPass: emailPass ? "✅ Set" : "❌ Missing", 
    emailHost: emailHost ? "✅ Set" : "❌ Missing",
    emailPort: emailPort ? "✅ Set" : "❌ Missing"
  });

  if (!emailUser || !emailPass || !emailHost || !emailPort) {
    console.error("❌ Missing required email environment variables");
    return null;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPort, 10),
      secure: true, // Use SSL for port 465
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      // Add these for better Gmail compatibility
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log("✅ Email transporter initialized successfully");
    return transporter;
  } catch (error) {
    console.error("❌ Failed to initialize email transporter:", error);
    return null;
  }
};

const transporter = initializeTransporter();

async function sendEmails(quote) {
  if (!transporter) {
    console.error("❌ No transporter available for sending emails");
    return;
  }

  try {
    console.log("📧 Preparing to send emails for quote:", quote._id);

    // Admin Notification
    console.log("📧 Sending admin notification...");
    await transporter.sendMail({
      from: `"Quote Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Quote Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
          <h2>New Quote Received</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> ${quote.name}</li>
            <li><strong>Email:</strong> ${quote.email}</li>
            <li><strong>Service:</strong> ${quote.service}</li>
            <li><strong>Project Details:</strong> ${quote.projectDetails}</li>
            <li><strong>Budget:</strong> ${quote.currency} ${quote.budgetRaw.toLocaleString()}</li>
            <li><strong>Message:</strong> ${quote.message || 'N/A'}</li>
          </ul>
          <p style="font-size: 12px; color: #666;">– DwHome & Crafts Team</p>
        </div>
      `,
    });
    console.log("✅ Admin notification sent for quote:", quote._id);

    // Client Confirmation
    console.log("📧 Sending client confirmation...");
    await transporter.sendMail({
      from: `"DwHome & Crafts" <${process.env.EMAIL_USER}>`,
      to: quote.email,
      subject: 'Quote Received - DwHome & Crafts',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333;">Thank You for Your Quote Request</h2>
          <p>Hi ${quote.name},</p>
          <p>Thank you for reaching out about your <strong>${quote.service}</strong> project. We've received your request and will get back to you within 24-48 hours with a detailed quote.</p>
          <div style="background: #fff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Your Request Summary:</h3>
            <p><strong>Service:</strong> ${quote.service}</p>
            <p><strong>Budget Range:</strong> ${quote.currency} ${quote.budgetRaw.toLocaleString()}</p>
          </div>
          <p>If you have any urgent questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br/>– DwHome & Crafts Team</p>
        </div>
      `,
    });
    console.log("✅ Client confirmation sent to:", quote.email);
  } catch (mailError) {
    console.error("❌ Email sending failed:", mailError);
    console.error("Full email error:", mailError.message);
    // Don't throw error - let quote submission succeed even if email fails
  }
}

export async function POST(request) {
  console.log('=== QUOTE SUBMISSION START ===');

  try {
    const ip = getClientIP(request.headers);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    console.log('1. Parsing request body...');
    const body = await request.json();
    console.log('Request data:', {
      name: body.name,
      email: body.email ? '[PROVIDED]' : 'MISSING',
      service: body.service,
      projectDetails: body.projectDetails ? 'PROVIDED' : 'MISSING',
      budget: body.budget,
      currency: body.currency,
      message: body.message || 'NONE'
    });

    const { name, email, service, projectDetails, budget, currency, message } = body;

    // Validation
    if (!name || !email || !service || !projectDetails) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, service, or projectDetails.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    console.log('2. Connecting to database...');
    await connectToDB();

    console.log('3. Preparing quote data...');
    const numericBudget = budget ? Number(budget) : 0;
    const quoteData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      service: service.trim(),
      projectDetails: projectDetails.trim(),
      message: message ? message.trim() : '',
      currency: currency || 'NGN',
      budgetRaw: numericBudget,
    };

    console.log('Quote data prepared:', {
      ...quoteData,
      email: '[HIDDEN]'
    });

    console.log('4. Saving to database...');
    const newQuote = await Quote.create(quoteData);
    console.log('✅ Quote saved successfully:', newQuote._id);

    // 5. Send emails (don't await to avoid blocking the response)
    console.log('5. Attempting to send emails...');
    sendEmails(newQuote).catch(error => {
      console.error('❌ Background email sending failed:', error);
    });

    return NextResponse.json({
      message: 'Quote submitted successfully',
      data: {
        id: newQuote._id,
        name: newQuote.name,
        service: newQuote.service
      }
    }, { status: 200 });
  } catch (error) {
    console.error('❌ FULL ERROR:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors);
    }
    return NextResponse.json({
      error: 'Failed to submit quote',
      details: error.message,
      type: error.name
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const quotes = await Quote.find({}).sort({ createdAt: -1 }).lean().exec();
    return NextResponse.json(quotes, { status: 200 });
  } catch (error) {
    console.error('❌ ERROR fetching quotes:', error);
    return NextResponse.json({
      error: 'Failed to fetch quotes',
      details: error.message
    }, { status: 500 });
  }
}