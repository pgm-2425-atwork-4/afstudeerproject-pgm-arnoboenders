// app/api/contact/route.ts
import { contactSchema } from "@/app/schemas/contact";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { subject, email, message } = result.data;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website contactformulier" <${email}>`,
      to: "info@loos-merchtem.be",
      subject: `Contactformulier: ${subject}`,
      text: message,
      html: `<p><strong>Email:</strong> ${email}</p><p><strong>Bericht:</strong><br/>${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Mail kon niet verzonden worden." },
      { status: 500 }
    );
  }
}
