import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Camera, ShoppingCart, Users, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Diagnose", path: "/diagnose", icon: Camera },
    { name: "Marketplace", path: "/buy", icon: ShoppingCart, isCenter: true },
    { name: "Community", path: "/community", icon: Users },
    { name: "Profile", path: "/user-profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border shadow-elegant z-40">
      <div className="flex items-center justify-around py-2 px-4 relative">
        {navItems.map((item) => {
          const isActiveItem = isActive(item.path);
          
          if (item.isCenter) {
            return (
              <Link key={item.path} to={item.path} className="relative -top-4">
                <Button
                  size="icon"
                  className={cn(
                    "w-14 h-14 rounded-full shadow-floating bg-gradient-primary hover:shadow-glow transition-all duration-300",
                    isActiveItem ? "scale-110 shadow-glow" : "hover:scale-105"
                  )}
                >
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </Button>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center space-y-1 p-2 rounded-lg min-w-[60px] transition-colors",
                isActiveItem
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform",
                isActiveItem ? "scale-110" : ""
              )} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}