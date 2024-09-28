import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/lib/email-service";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Generate a reset token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

    // Save the token to the database
    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    // Send an email with the reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;
    await sendEmail({
      to: email,
      subject: "Reset Your Password",
      text: `Click the following link to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    return NextResponse.json(
      { message: "Password reset email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { message: "Error sending reset email" },
      { status: 500 }
    );
  }
}
