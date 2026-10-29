import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Skip files such as /admin/atelier.webp. Those are public assets, not pages.
  matcher: ["/admin", "/admin/((?!.*\\.).*)"],
};
