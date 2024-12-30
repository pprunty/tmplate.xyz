import { routes, Route } from '@/config/routes';

const filterRoutes = (routes: Route[], layout: string, userRole?: string): Route[] => {
  return routes
    .filter(
      (route) =>
        (!route.role || (userRole && route.role.includes(userRole))) &&
        (!route.showInLayouts || route.showInLayouts.includes(layout))
    )
    .map((route) => ({
      ...route,
      children: route.children ? filterRoutes(route.children, layout, userRole) : undefined,
    }));
};

export const getRoutesForLayout = (layout: string, userRole?: string): Route[] => {
  const filteredRoutes = filterRoutes(routes, layout, userRole);
  console.log(`Filtered Routes for Layout: ${layout}`, filteredRoutes);
  return filteredRoutes;
};
