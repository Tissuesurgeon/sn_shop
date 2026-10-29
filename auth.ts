import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";
import { authConfig } from "@/auth.config";
import { AccessDenied } from "@/lib/auth-errors";
import { prisma } from "@/lib/prisma";

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function resendKey(): string {
  return process.env.AUTH_RESEND_KEY || process.env.RESEND_API_KEY || "";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "resend") {
        const email = user.email?.toLowerCase();
        if (!email || !adminEmails().includes(email)) return false;
        await prisma.user.update({ where: { email }, data: { role: "OWNER" } });
        user.role = "OWNER";
        return true;
      }
      if (account?.provider === "credentials") {
        return user.role === "OWNER" || user.role === "STAFF";
      }
      return false;
    },
  },
  providers: [
    Resend({
      apiKey: resendKey(),
      from: process.env.EMAIL_FROM || "SN Stitches <orders@localhost>",
      maxAge: 10 * 60,
      async sendVerificationRequest({ identifier, url, provider }) {
        const key = resendKey();
        if (!key) {
          console.log(`Magic link for ${identifier}: ${url}`);
          return;
        }
        const { Resend: ResendClient } = await import("resend");
        const resend = new ResendClient(key);
        const { error } = await resend.emails.send({
          from: provider.from ?? "SN Stitches <orders@localhost>",
          to: identifier,
          subject: "Sign in to SN Stitches",
          text: `Sign in to the SN Stitches atelier:\n${url}\n\nThis link expires in 10 minutes.`,
        });
        if (error) throw new Error(error.message);
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;
        if (user.role !== "OWNER" && user.role !== "STAFF") {
          throw new AccessDenied();
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
