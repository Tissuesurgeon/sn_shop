import { describe, expect, it } from "vitest";
import { loginNotice } from "./login-notice";

describe("loginNotice", () => {
  it("shows the mockup specimen before a real attempt", () => {
    expect(loginNotice({})).toEqual({
      text: "That password doesn't match. 2 attempts left.",
      tone: "error",
    });
  });

  it("tells non-admins they have no access", () => {
    expect(loginNotice({ error: "CredentialsSignin", code: "access_denied" }).text).toBe(
      "You don't have access.",
    );
    expect(loginNotice({ error: "AccessDenied" }).text).toBe("You don't have access.");
  });

  it("uses a plain mismatch message after a bad password", () => {
    expect(loginNotice({ error: "CredentialsSignin" }).text).toBe("That password doesn't match.");
  });
});
