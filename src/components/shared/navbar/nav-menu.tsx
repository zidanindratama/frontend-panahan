import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Link } from "react-router";
import { NAV_LINKS } from "@/constants/navigation-links";

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      {NAV_LINKS.map((link) => (
        <NavigationMenuItem key={link.to}>
          <NavigationMenuLink asChild>
            <Link to={link.to}>{link.label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
