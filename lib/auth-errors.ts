import { CredentialsSignin } from "next-auth";

export class AccessDenied extends CredentialsSignin {
  code = "access_denied";
}
