import { getVerificationByEmail } from "@/app/actions/user.actions";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "./prisma";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 3600 * 1000);
  const existingToken = await getVerificationByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
  return verificationToken.token;
};
