import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { Adapter } from "next-auth/adapters";
import Resend from "next-auth/providers/resend";

declare module "next-auth" {
  interface User {
    role: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/logo.png",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  // Callbacks for client-side session
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
  providers: [
    Google,
    Github,
    Resend({
      from: "no-reply@resend.dev",
    }),
  ],
  trustHost: true,
});
