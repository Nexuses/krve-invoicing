import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, phone, question } = body;

    if (!fullName?.trim() || !companyName?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, companyName, email, phone' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.FROM_EMAIL;
    const to = process.env.TO_EMAIL || process.env.REPLY_TO;
    const secure = process.env.SMTP_SECURE === 'true';

    if (!host || !user || !pass || !from || !to) {
      console.error('Missing SMTP env: SMTP_HOST, SMTP_USER, SMTP_PASS, FROM_EMAIL, and TO_EMAIL or REPLY_TO are required.');
      return NextResponse.json(
        { error: 'Email configuration is missing' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const subject = `UAE e-Invoicing inquiry from ${fullName} (${companyName})`;
    const text = [
      `Name: ${fullName}`,
      `Company: ${companyName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      question?.trim() ? `Question: ${question.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const html = `
      <h2>New e-Invoicing compliance inquiry</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${question?.trim() ? `<p><strong>Question:</strong><br/>${question.trim().replace(/\n/g, '<br/>')}</p>` : ''}
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Send inquiry error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to send inquiry' },
      { status: 500 }
    );
  }
}
