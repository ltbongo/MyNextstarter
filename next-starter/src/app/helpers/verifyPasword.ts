import bcrypt from "bcryptjs";

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
