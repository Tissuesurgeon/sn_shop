"use client";

import { useState } from "react";
import { sendMagicLink, signInWithPassword } from "./actions";

export function LoginForm({
  notice,
}: {
  notice: { text: string; tone: "error" | "info" };
}) {
  const [passwordEmpty, setPasswordEmpty] = useState(true);

  return (
    <form action={signInWithPassword}>
      <div className="fld">
        <label className="lab" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="in"
          autoComplete="username"
          required
          defaultValue="owner@snstitches.com"
        />
      </div>
      <div className="fld">
        <label className="lab" htmlFor="password">
          Password
        </label>
        <div className="pw">
          <input
            id="password"
            name="password"
            type="password"
            className="in f"
            autoComplete="current-password"
            required
            onInput={(event) => setPasswordEmpty(event.currentTarget.value.length === 0)}
            style={{ color: passwordEmpty ? "transparent" : undefined }}
          />
          {passwordEmpty ? (
            <span className="pw-sample" aria-hidden="true">
              ••••••••••|
            </span>
          ) : null}
        </div>
      </div>
      <div className={notice.tone === "error" ? "fe" : "sm muted"} style={{ margin: "-6px 0 14px" }}>
        {notice.tone === "error" ? `⚠ ${notice.text}` : notice.text}
      </div>
      <button className="btn p b" type="submit">
        Sign in
      </button>
      <div className="lg-or">
        <hr className="seam" />
        or
        <hr className="seam" />
      </div>
      <button className="btn g b" type="submit" formAction={sendMagicLink}>
        ✉ Email me a magic link
      </button>
      <p className="xs muted lg-note">Only approved SN Stitches staff can access this area.</p>
    </form>
  );
}
