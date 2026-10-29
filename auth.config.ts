import type { NextAuthConfig } from "next-auth";
import { canAccessAdminPath, type SessionRole } from "@/lib/admin-access";

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
    verifyRequest: "/admin/login?sent=1",
    error: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const role = auth?.user?.role as SessionRole;
      return canAccessAdminPath(request.nextUrl.pathname, role);
    },
    jwt({ token, user }) {
      const role = user?.role as SessionRole;
      if (role === "OWNER" || role === "STAFF" || role === "CUSTOMER") token.role = role;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id;
        const role = token.role as SessionRole;
        if (role === "OWNER" || role === "STAFF" || role === "CUSTOMER") session.user.role = role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
