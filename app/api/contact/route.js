import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass || gmailPass === 'your_gmail_app_password_here') {
      console.error('Gmail credentials not configured in .env.local');
      return Response.json({ error: 'Email service not configured. Please contact me directly at saiphapale7272@gmail.com' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: gmailUser, pass: gmailPass },
      tls: { rejectUnauthorized: false },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: 'saiphapale7272@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject} — from ${name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
        <div style="background:linear-gradient(135deg,#6c63ff,#a78bfa);padding:24px;text-align:center;">
          <h2 style="margin:0;color:white;">New Message from Portfolio 🚀</h2>
        </div>
        <div style="padding:24px;background:#fff;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p style="background:#f5f5f5;padding:16px;border-radius:8px;border-left:4px solid #6c63ff;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>`,
    });

    await transporter.sendMail({
      from: `"Sai Rajesh Phapale" <${gmailUser}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 👋`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid #ddd;">
        <div style="background:linear-gradient(135deg,#6c63ff,#a78bfa);padding:24px;text-align:center;">
          <h2 style="margin:0;color:white;">Hey ${name}! 👋</h2>
        </div>
        <div style="padding:24px;background:#fff;">
          <p>Thanks for getting in touch! I've received your message and will reply within <strong>24 hours</strong>.</p>
          <p style="background:#f5f5f5;padding:16px;border-radius:8px;border-left:4px solid #6c63ff;"><em>${message.replace(/\n/g, '<br>')}</em></p>
          <p>Best regards,<br/><strong>Sai Rajesh Phapale</strong><br/>Full Stack Developer & DevOps Engineer</p>
        </div>
      </div>`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Email error:', err.message);
    return Response.json({ error: `Failed to send: ${err.message}` }, { status: 500 });
  }
}
