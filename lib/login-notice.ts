export function loginNotice(input: { error?: string; code?: string; sent?: boolean }): {
  text: string;
  tone: "error" | "info";
} {
  if (input.sent && !input.error) {
    return {
      text: "Check your email for a sign-in link. It expires in 10 minutes.",
      tone: "info",
    };
  }
  if (input.code === "access_denied" || input.error === "AccessDenied") {
    return { text: "You don't have access.", tone: "error" };
  }
  if (input.error) {
    return { text: "That password doesn't match.", tone: "error" };
  }
  return { text: "That password doesn't match. 2 attempts left.", tone: "error" };
}
