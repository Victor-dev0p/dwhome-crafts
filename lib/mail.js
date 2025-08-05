import nodemailer from 'nodemailer';

export async function sendQuoteEmail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,     // your Gmail
      pass: process.env.EMAIL_PASS,     // app password (not your real password!)
    },
  });

  const mailOptions = {
    from: `"Brooklyn & Bronx" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}
