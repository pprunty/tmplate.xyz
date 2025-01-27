import { Home, Search, User, Settings, ShoppingBag, Users, Percent, FileText } from 'lucide-react';

export interface Route {
  href: string;
  translationKey: string;
  label: string;
icon?: React.ComponentType<{ className?: string; size?: number } & React.SVGProps<SVGSVGElement>>;
  role?: string[]; // Roles allowed to view this route (e.g., ['admin', 'user'])
  showInLayouts?: string[]; // Layouts where this route is visible (e.g., ['stacked', 'admin'])
  children?: Route[]; // Sub-routes for nested navigation
}

export const routes: Route[] = [
  {
    href: '/',
    translationKey: 'home',
    label: 'Home',
    icon: Home,
    showInLayouts: ['admin', 'stacked'],
  },
  {
    href: '/profile',
    translationKey: 'profile',
    label: 'Profile',
    icon: User,
    showInLayouts: ['basic'],
  },
  {
    href: '/settings',
    translationKey: 'settings',
    label: 'Settings',
    icon: Settings,
    showInLayouts: ['admin'],
    children: [
      {
        href: '/settings/account',
        translationKey: 'account',
        label: 'Account Settings',
        icon: FileText,
        showInLayouts: ['admin'],
      },
      {
        href: '/settings/privacy',
        translationKey: 'privacy',
        label: 'Privacy Policy',
        icon: FileText,
        showInLayouts: ['admin', 'Footer'],
      },
    ],
  },
  {
    href: '/products',
    translationKey: 'products',
    label: 'Products',
    icon: ShoppingBag,
    showInLayouts: ['basic', 'admin'],
    role: ['admin'],
    children: [
      {
        href: '/products/new',
        translationKey: 'newProduct',
        label: 'Add New Product',
        icon: FileText,
        role: ['admin'],
      },
      {
        href: '/products/list',
        translationKey: 'productList',
        label: 'Product List',
        icon: FileText,
        role: ['admin'],
      },
    ],
  },
  {
    href: '/customers',
    translationKey: 'customers',
    label: 'Customers',
    icon: Users,
    showInLayouts: ['admin'],
    role: ['admin'],
  },
      {
        href: '/search',
        translationKey: 'search',
        label: 'Search',
        icon: Search,
        showInLayouts: ['stacked', 'admin'],
      },
  {
    href: '/discounts',
    translationKey: 'discounts',
    label: 'Discounts',
    icon: Percent,
    showInLayouts: ['admin', 'stacked'],
    role: ['admin'],
  },
];
