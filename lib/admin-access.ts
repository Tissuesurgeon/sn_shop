export type SessionRole = "CUSTOMER" | "STAFF" | "OWNER" | undefined;

export function isAdminRole(role: SessionRole): boolean {
  return role === "OWNER" || role === "STAFF";
}

/** Public login stays open. Every other /admin path needs OWNER or STAFF. */
export function canAccessAdminPath(pathname: string, role: SessionRole): boolean {
  if (!pathname.startsWith("/admin")) return true;
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) return true;
  return isAdminRole(role);
}
