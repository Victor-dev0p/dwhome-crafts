// app/api/quotes/route.js - FIXED VERSION (Properly awaits emails)
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

// Initialize transporter (using port 465 as you prefer)
const initializeTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  console.log("Email config check:", {
    emailUser: emailUser ? "SET" : "MISSING",
    emailPass: emailPass ? "SET" : "MISSING"
  });

  if (!emailUser || !emailPass) {
    console.error("Missing email credentials");
    return null;
  }

  try {
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      port: 465,
      secure: true, // true for 465
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 20000, // 20 seconds
      greetingTimeout: 10000, // 10 seconds  
      socketTimeout: 20000, // 20 seconds
    });

    console.log("Email transporter initialized successfully");
    return transporter;
  } catch (error) {
    console.error("Failed to initialize email transporter:", error);
    return null;
  }
};

const transporter = initializeTransporter();

async function sendEmails(quote) {
  if (!transporter) {
    throw new Error("No transporter available");
  }

  console.log("Preparing to send emails for quote:", quote._id);
  
  // Verify connection first
  try {
    console.log("Testing SMTP connection...");
    await transporter.verify();
    console.log("SMTP connection verified successfully");
  } catch (verifyError) {
    console.error("SMTP verification failed:", verifyError);
    throw new Error(`SMTP verification failed: ${verifyError.message}`);
  }

  const formattedBudget = `${quote.currency === 'USD' ? '$' : '₦'}${quote.budgetRaw.toLocaleString()}`;

  // Admin Notification
  console.log("Sending admin notification...");
  try {
    const adminResult = await transporter.sendMail({
      from: `"Quote System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Quote Request - ${quote.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Quote Request</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Name:</strong> ${quote.name}</p>
            <p><strong>📧 Email:</strong> ${quote.email}</p>
            <p><strong>🛠️ Service:</strong> ${quote.service}</p>
            <p><strong>💰 Budget:</strong> ${formattedBudget}</p>
            <p><strong>📝 Project Details:</strong></p>
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${quote.projectDetails}
            </div>
            ${quote.message ? `
              <p><strong>💬 Additional Message:</strong></p>
              <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #28a745; margin: 10px 0;">
                ${quote.message}
              </div>
            ` : ''}
            <p><strong>⏰ Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });
    console.log("✅ Admin notification sent successfully:", adminResult.messageId);
  } catch (adminError) {
    console.error("❌ Admin email failed:", adminError);
    throw new Error(`Admin email failed: ${adminError.message}`);
  }

  // Client Confirmation  
  console.log("Sending client confirmation...");
  try {
    const clientResult = await transporter.sendMail({
      from: `"DWHome & Crafts" <${process.env.EMAIL_USER}>`,
      to: quote.email,
      subject: 'Quote Request Received - DWHome & Crafts',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Thank You, ${quote.name}!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your quote request has been received</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              We've received your request for <strong>${quote.service}</strong> and will get back to you within 24-48 hours with a detailed quote.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #007bff;">Your Request Summary:</h3>
              <p><strong>Service:</strong> ${quote.service}</p>
              <p><strong>Budget:</strong> ${formattedBudget}</p>
            </div>
            
            <div style="border-top: 1px solid #dee2e6; padding-top: 20px; margin-top: 30px;">
              <p style="margin: 0; color: #666;">
                Best regards,<br>
                <strong style="color: #007bff;">DWHome & Crafts Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    });
    console.log("✅ Client confirmation sent successfully:", clientResult.messageId);
  } catch (clientError) {
    console.error("❌ Client email failed:", clientError);
    // Don't throw error for client email - admin email is more important
    console.log("⚠️ Continuing despite client email failure");
  }

  console.log("✅ Email sending process completed");
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

    // 5. Send emails - PROPERLY AWAIT THIS TIME
    console.log('5. Sending emails...');
    let emailStatus = 'success';
    try {
      await sendEmails(newQuote); // AWAIT the email sending
      console.log('✅ All emails sent successfully');
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      emailStatus = 'failed';
      // Don't fail the whole request if emails fail
    }

    return NextResponse.json({
      message: 'Quote submitted successfully',
      data: {
        id: newQuote._id,
        name: newQuote.name,
        service: newQuote.service
      },
      emailStatus // Include email status for debugging
    }, { status: 200 });

  } catch (error) {
    console.error('❌ FULL ERROR:', error);
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