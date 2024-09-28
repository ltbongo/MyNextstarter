// src/app/api/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";

import { getUserByEmail } from "@/app/helpers/getUserByEmail";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  console.log("token", token);

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token: token },
    });

    if (!verificationToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (
      verificationToken.expiresAt &&
      verificationToken.expiresAt < new Date()
    ) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    const user = await getUserByEmail(verificationToken.email);

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        isEmailVerified: true,
      },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return NextResponse.redirect(new URL("/signin", request.url));
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
