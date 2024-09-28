// src/app/api/resend-verification/route.ts
import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/lib/email-service";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";

export async function POST(request: NextRequest) {
  const { to } = await request.json();

  try {
    const user = await prisma.user.findUnique({ where: { email: to } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    if (user.isEmailVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    // const verificationToken = randomBytes(32).toString("hex");
    // const verificationTokenExpiresAt = new Date(
    //   Date.now() + 24 * 60 * 60 * 1000
    // ); // 24 hours from now

    const verificationToken = await generateVerificationToken(user.email);

    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken },
    });

    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${verificationToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      text: `Please click the following link to verify your email: ${verificationLink}`,
      html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });

    return NextResponse.json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error resending verification email:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
