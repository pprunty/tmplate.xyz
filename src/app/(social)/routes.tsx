import { Home, Search, User, Settings, ShoppingBag, Users, Percent, FileText } from "lucide-react";

export interface Route {
  href: string;
  translationKey: string;
  label: string;
  icon?: React.ComponentType<{ className?: string; size?: number } & React.SVGProps<SVGSVGElement>>;
  role?: string[];
  children?: Route[];
  showInLayouts?: string[];
}

// Define the prefix (e.g., "admin")
const PREFIX = "/social";

// Helper function to recursively add prefix to href values
const addPrefixToRoutes = (routes: Route[], prefix: string): Route[] => {
  return routes.map(route => ({
    ...route,
    href: `${prefix}${route.href}`, // Add prefix to route
    children: route.children ? addPrefixToRoutes(route.children, prefix) : undefined, // Recursively apply to children
  }));
};

// Base routes (without prefix)
const baseRoutes: Route[] = [
  {
    href: '/',
    translationKey: "home",
    label: "Home",
    icon: Home,
    showInLayouts: ['admin', 'stacked', 'bottom-bar', 'sidebar'],
  },
  {
    href: "/profile",
    translationKey: "profile",
    label: "Profile",
    icon: User,
    showInLayouts: ['basic', 'stacked'],
  },
  {
    href: "/settings",
    translationKey: "settings",
    label: "Settings",
    icon: Settings,
    showInLayouts: ["admin", "stacked"],
    children: [
      {
        href: "/settings/account",
        translationKey: "account",
        label: "Account Settings",
        icon: FileText,
        showInLayouts: ["admin"],
      },
      {
        href: "/settings/privacy",
        translationKey: "privacy",
        label: "Privacy Policy",
        icon: FileText,
        showInLayouts: ["admin", "Footer"],
      },
    ],
  },
  {
    href: "/products",
    translationKey: "products",
    label: "Products",
    icon: ShoppingBag,
    role: ["admin"],
    children: [
      {
        href: "/products/new",
        translationKey: "newProduct",
        label: "Add New Product",
        icon: FileText,
        role: ["admin"],
      },
      {
        href: "/products/list",
        translationKey: "productList",
        label: "Product List",
        icon: FileText,
        role: ["admin"],
      },
    ],
  },
  {
    href: "/customers",
    translationKey: "customers",
    label: "Customers",
    icon: Users,
    role: ["admin"],
  },
  {
    href: "/search",
    translationKey: "search",
    label: "Search",
    icon: Search,
    showInLayouts: ["stacked", "admin", "bottom-bar", 'sidebar'],
  },
  {
    href: "/discounts",
    translationKey: "discounts",
    label: "Discounts",
    icon: Percent,
    role: ["admin"],
  },
];

// Export the prefixed routes
export const routes: Route[] = addPrefixToRoutes(baseRoutes, PREFIX);
