"use client";

import { NavigationMenu } from "@/components/ui/navigation-menu";

const ClientNavigationMenu: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <NavigationMenu>{children}</NavigationMenu>;
};

export default ClientNavigationMenu;
