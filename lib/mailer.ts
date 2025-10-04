import nodemailer from "nodemailer";

export async function sendResetEmail(to: string, url: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset your password",
    html: `<p>Click below to reset your password:</p>
           <a href="${url}">${url}</a>`,
  });
}
