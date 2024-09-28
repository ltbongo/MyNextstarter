import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/lib/email-service";

export async function POST(request: NextRequest) {
  const { to, subject, text, html } = await request.json();

  try {
    await sendEmail({ to, subject, text, html });
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
