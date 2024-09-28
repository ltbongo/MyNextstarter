/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { sendEmail } from "@/lib/email-service";
import { generateVerificationToken } from "@/lib/tokens";
import { getSession } from "next-auth/react";
import { LoginSchema } from "../schemas/login-schema";
import { RegisterSchema } from "../schemas/register-schema";

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getUserFromDb(email: string) {
  try {
    const existedUser = await prisma.user.findUnique({
      where: { email },
    });

    return {
      success: true,
      data: existedUser,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
};

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Login error" };
  }
  const { email, password } = validatedFields.data;

  const existingUser = await getUserFromDb(email);

  if (!existingUser || !existingUser.data?.email || !existingUser.data?.password) {
    return { error: " Invalid email or password" };
  }

  if (!existingUser.data?.isEmailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.data.email);
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        token: verificationToken,
      }),
    });

    return {
      success: "Please verify your email before logging in. A new verification email has been sent.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    await getSession();
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Login error" };
      }
    }
    throw error;
  }
};

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Registration error" };
  }

  const { name, surname, phone, email, password } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists.",
      };
    }

    const hash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        surname,
        phone,
        email,
        password: hash,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${verificationToken}`;

    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       to: email,
    //       subject: "Verify your email",
    //       text: `Please click the following link to verify your email: ${verificationLink}`,
    //       html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    //     }),
    //   }
    // );

    const response = await sendEmail({
      to: email,
      subject: "Verify your email",
      text: `Please click the following link to verify your email: ${verificationLink}`,
      html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });

    if (!response) {
      throw new Error("Failed to send verification email");
    }

    return {
      success: "Please check your email to verify your account.",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "An error occurred during registration.",
    };
  }
}

export async function getVerificationByEmail(email: string) {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
}

export async function getVerificationByToken(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
}

export async function updateUser({ name, id }: { name: string; id: string }) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name },
    });

    revalidatePath("/");

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
