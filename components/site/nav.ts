export type NavLink = {
  href: string;
  label: string;
  isActive: (path: string, query: URLSearchParams) => boolean;
};

export const NAV: NavLink[] = [
  {
    href: "/shop",
    label: "Shop",
    isActive: (path, query) =>
      path.startsWith("/shop") && query.get("sort") !== "new" && !["/shop/ankara", "/shop/kente"].includes(path),
  },
  {
    href: "/shop?sort=new",
    label: "New in",
    isActive: (path, query) => path.startsWith("/shop") && query.get("sort") === "new",
  },
  { href: "/shop/ankara", label: "Ankara", isActive: (path) => path === "/shop/ankara" },
  { href: "/shop/kente", label: "Kente", isActive: (path) => path === "/shop/kente" },
  { href: "/made-to-measure", label: "Bespoke", isActive: (path) => path.startsWith("/made-to-measure") },
  { href: "/about", label: "Our story", isActive: (path) => path === "/about" },
];

export const SHOP_MENU = [
  { href: "/shop", label: "All dresses" },
  { href: "/shop/ankara", label: "Ankara" },
  { href: "/shop/kente", label: "Kente" },
  { href: "/shop/evening", label: "Evening" },
  { href: "/shop/casual", label: "Casual" },
];

export const DRAWER_LINKS = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?sort=new", label: "New in" },
  { href: "/shop/ankara", label: "Ankara" },
  { href: "/shop/kente", label: "Kente" },
  { href: "/shop/evening", label: "Evening" },
  { href: "/shop/casual", label: "Casual" },
  { href: "/made-to-measure", label: "Bespoke · made to measure" },
  { href: "/about", label: "Our story" },
];

export function shopMenuActive(href: string, path: string, query: URLSearchParams): boolean {
  if (href === "/shop") return path === "/shop" && query.get("sort") !== "new";
  return path === href;
}

export function drawerLinkActive(href: string, path: string, query: URLSearchParams): boolean {
  if (href === "/shop") return path === "/shop" && query.get("sort") !== "new";
  if (href === "/shop?sort=new") return path.startsWith("/shop") && query.get("sort") === "new";
  if (href === "/made-to-measure") return path.startsWith("/made-to-measure");
  return path === href;
}
