import { loginNotice } from "@/lib/login-notice";
import { LoginForm } from "./login-form";
import "./login.css";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : undefined;
  const code = typeof params.code === "string" ? params.code : undefined;
  const sent = params.sent === "1";
  const notice = loginNotice({ error, code, sent });

  return (
    <div className="lgw">
      <div className="lgart">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/admin/atelier.webp" alt="" />
        <div className="lgq">
          <span className="sc" style={{ fontSize: 44, color: "#F08AB8" }}>
            Welcome back
          </span>
          <p style={{ color: "#E9DFCF" }}>Every order is a seam. Let&apos;s stitch today&apos;s.</p>
        </div>
      </div>
      <div className="lgf">
        <div className="box stitched lgbox">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo" src="/brand/logo.webp" alt="SN Stitches" />
          <p className="eb">Atelier admin</p>
          <h1>Sign in</h1>
          <LoginForm notice={notice} />
        </div>
      </div>
    </div>
  );
}
