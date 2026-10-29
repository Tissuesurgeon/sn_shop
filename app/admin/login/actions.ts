"use server";

import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AccessDenied } from "@/lib/auth-errors";
import { rateLimit } from "@/lib/rate-limit";

function isNextRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    String((error as { digest?: unknown }).digest).startsWith("NEXT_REDIRECT")
  );
}

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!rateLimit(`login:${email}`, 8, 15 * 60 * 1000)) {
    redirect("/admin/login?error=CredentialsSignin");
  }
  try {
    await signIn("credentials", {
      email,
      password: String(formData.get("password") ?? ""),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    const code = error instanceof CredentialsSignin ? error.code : undefined;
    if (error instanceof AccessDenied || code === "access_denied") {
      redirect("/admin/login?code=access_denied");
    }
    redirect("/admin/login?error=CredentialsSignin");
  }
}

export async function sendMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!rateLimit(`magic:${email}`, 5, 15 * 60 * 1000)) {
    redirect("/admin/login?error=CredentialsSignin");
  }
  await signIn("resend", {
    email,
    redirectTo: "/admin",
  });
}
