import { Home, Search, User, Settings, ShoppingBag, Users, Percent } from 'lucide-react';

export const commonRoutes = [
  {
    href: '/',
    translationKey: 'home',
    label: 'Home',
    icon: Home
  },
  {
    href: '/search',
    translationKey: 'search',
    label: 'Search',
    icon: Search
  },
  {
    href: '/profile',
    translationKey: 'profile',
    label: 'Profile',
    icon: User
  },
  {
    href: '/settings',
    translationKey: 'settings',
    label: 'Settings',
    icon: Settings
  },
];

export const desktopExtraRoutes = [
  {
    href: '/products',
    translationKey: 'products',
    label: 'Products',
    icon: ShoppingBag,
  },
  {
    href: '/customers',
    translationKey: 'customers',
    label: 'Customers',
    icon: Users,
  },
  {
    href: '/discounts',
    translationKey: 'discounts',
    label: 'Discounts',
    icon: Percent,
  },
];

// You can combine and export sets depending on layout
export const bottomBarRoutes = commonRoutes;
export const sidebarMenuRoutes = [
  {
    href: '/',
    translationKey: 'home',
    label: 'Home',
    icon: Home,
  },
  ...desktopExtraRoutes
];
