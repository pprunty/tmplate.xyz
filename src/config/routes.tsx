import { Home, Search, User, Settings, ShoppingBag, Users, Percent, FileText } from 'lucide-react';

export interface Route {
  href: string;
  translationKey: string;
  label: string;
  icon?: React.ComponentType;
  role?: string[]; // Roles allowed to view this route (e.g., ['admin', 'user'])
  showInLayouts?: string[]; // Layouts where this route is visible (e.g., ['BottomBar', 'SidebarMenu'])
  children?: Route[]; // Sub-routes for nested navigation
}

export const routes: Route[] = [
  {
    href: '/',
    translationKey: 'home',
    label: 'Home',
    icon: Home,
    showInLayouts: ['BottomBar', 'SidebarMenu'],
  },
  {
    href: '/profile',
    translationKey: 'profile',
    label: 'Profile',
    icon: User,
    showInLayouts: ['BottomBar'],
  },
  {
    href: '/settings',
    translationKey: 'settings',
    label: 'Settings',
    icon: Settings,
    showInLayouts: ['SidebarMenu'],
    children: [
      {
        href: '/settings/account',
        translationKey: 'account',
        label: 'Account Settings',
        icon: FileText,
        showInLayouts: ['SidebarMenu'],
      },
      {
        href: '/settings/privacy',
        translationKey: 'privacy',
        label: 'Privacy Policy',
        icon: FileText,
        showInLayouts: ['SidebarMenu', 'Footer'],
      },
    ],
  },
  {
    href: '/products',
    translationKey: 'products',
    label: 'Products',
    icon: ShoppingBag,
    showInLayouts: ['SidebarMenu'],
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
    showInLayouts: ['SidebarMenu'],
    role: ['admin'],
  },
      {
        href: '/search',
        translationKey: 'search',
        label: 'Search',
        icon: Search,
        showInLayouts: ['BottomBar', 'SidebarMenu'],
      },
  {
    href: '/discounts',
    translationKey: 'discounts',
    label: 'Discounts',
    icon: Percent,
    showInLayouts: ['SidebarMenu'],
    role: ['admin'],
  },
];
