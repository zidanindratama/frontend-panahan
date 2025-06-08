import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { NAV_LINKS } from "@/constants/navigation-links";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="p-6">
          <nav className="flex flex-col space-y-4 text-lg">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};
