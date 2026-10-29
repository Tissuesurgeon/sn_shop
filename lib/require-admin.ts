import { auth } from "@/auth";
import { isAdminRole, type SessionRole } from "@/lib/admin-access";

export class AdminAuthError extends Error {
  constructor() {
    super("You don't have access.");
    this.name = "AdminAuthError";
  }
}

export async function requireAdmin() {
  const session = await auth();
  const role = session?.user?.role as SessionRole;
  if (!session || !session.user || !isAdminRole(role)) {
    throw new AdminAuthError();
  }
  return session;
}
