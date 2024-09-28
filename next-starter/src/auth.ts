import { getUserById } from "@/app/actions/user.actions";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";

type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
  id: string;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/signin",
    error: "/error",
    verifyRequest: "/verify-request",
    newUser: "/new-user",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isEmailVerified: true,
        },
      });
    },
    signIn: async (message) => {
      console.log("signIn", message);
    },
    signOut: async (message) => {
      console.log("signOut", message);
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = user.id ? await getUserById(user.id) : null;

      if (!existingUser) return false;

      if (!existingUser.isEmailVerified) return false;

      return true;
    },
    async jwt({ token }){

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    async session({ session, token }){
      
      if (token.sub && session.user) {
        session.user.id = token.sub as ExtendedUser["id"];        
      }

      if (token.role && session.user) {
        session.user.role = token.role as ExtendedUser["role"];
      }

      return session;
    },
    
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  
});
