import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SettingsModal } from "@/components/SettingsModal";

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from "@clerk/clerk-react";
import { useAuth } from "@/contexts/AuthContext";
import { RoleBasedAuth } from "@/components/RoleBasedAuth";
import { 
  Home, 
  Camera, 
  ShoppingCart, 
  User, 
  Menu, 
  Sparkles,
  Leaf,
  TrendingUp,
  Users,
  MessageCircle,
  Cloud,
  X,
  Bell,
  Search,
  LogOut,
  Settings
} from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();
  const { logout, isAuthenticated, isClerkUser, userRole } = useAuth();
  const { signOut } = useClerk();
  const { user } = useUser();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    if (isClerkUser) {
      await signOut();
    } else {
      logout();
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Diagnose", path: "/diagnose", icon: Camera },
    { name: "Marketplace", path: "/buy", icon: ShoppingCart },
  ];

  const analyticsItems = [
    { name: "Market Analysis", path: "/market-analysis", icon: TrendingUp },
    { name: "Recommendations", path: "/recommendations", icon: Sparkles },
  ];

  const resourcesItems = [
    { name: "Government Schemes", path: "/government-schemes", icon: Users },
    { name: "community", path: "/community", icon: Cloud },
    { name: "Crops & Hybrids", path: "/hybrid", icon: Leaf },
    { name: "News & Blogs", path: "/blogs", icon: MessageCircle },
  ];


  const adminItems = [
    { name: "Seller Panel", path: "/seller-panel", icon: ShoppingCart },
    { name: "Admin Panel", path: "/admin", icon: Users },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Only */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/lovable-uploads/logo.png" 
                alt="AgriSmart Logo" 
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                 >
                   <item.icon className="h-4 w-4" />
                   {item.name && <span>{item.name}</span>}
                 </Link>
              ))}
              
              {/* Analytics Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${
                      analyticsItems.some(item => isActive(item.path))
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>Analytics</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card border border-border">
                  {analyticsItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link 
                        to={item.path} 
                        className={`cursor-pointer ${isActive(item.path) ? 'text-primary' : ''}`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${
                      resourcesItems.some(item => isActive(item.path))
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Leaf className="h-4 w-4" />
                    <span>Resources</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card border border-border">
                  {resourcesItems.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link 
                        to={item.path} 
                        className={`cursor-pointer ${isActive(item.path) ? 'text-primary' : ''}`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
            
              {/* Search Button */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-4 w-4" />
              </Button>
              
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-card border border-border">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    <DropdownMenuItem className="p-4 cursor-pointer">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Weather Alert</p>
                        <p className="text-xs text-muted-foreground">Heavy rain expected in your area</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-4 cursor-pointer">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Market Update</p>
                        <p className="text-xs text-muted-foreground">Tomato prices increased by 15%</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-4 cursor-pointer">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">New Feature</p>
                        <p className="text-xs text-muted-foreground">AI crop diagnosis now available</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center justify-center text-primary">
                    View All Notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Weather */}
              <Link to="/weather">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`hidden md:flex ${isActive('/weather') ? 'text-primary' : ''}`}
                >
                  <Cloud className="h-4 w-4" />
                </Button>
              </Link>
              
              {/* Role-based Admin Dropdowns */}
              <RoleBasedAuth />

              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                      <Users className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card border border-border">
                    <DropdownMenuLabel>Admin Tools</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {adminItems.map((item) => (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link to={item.path} className="cursor-pointer">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}


              {/* Authentication */}
              <SignedOut>
                <Link to="/auth">
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
              </SignedOut>
              
              <SignedIn>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card border border-border">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.firstName || user?.username || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.emailAddresses?.[0]?.emailAddress}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/user-profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsSettingsOpen(true)} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SignedIn>

              {/* Role-based Authentication for non-Clerk users */}
              {isAuthenticated && !isClerkUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card border border-border">
                    <DropdownMenuLabel>Role Account ({userRole})</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/user-profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsSettingsOpen(true)} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-2">
              {/* Main nav items */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                 >
                   <item.icon className="h-5 w-5" />
                   {item.name && <span className="font-medium">{item.name}</span>}
                 </Link>
              ))}
              
              {/* Analytics items */}
              <div className="border-t border-border pt-2 mt-2">
                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Analytics</p>
                {analyticsItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                   >
                     <item.icon className="h-5 w-5" />
                     {item.name && <span className="font-medium">{item.name}</span>}
                   </Link>
                ))}
              </div>
              
              {/* Resources items */}
              <div className="border-t border-border pt-2 mt-2">
                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resources</p>
                {resourcesItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                   >
                     <item.icon className="h-5 w-5" />
                     {item.name && <span className="font-medium">{item.name}</span>}
                   </Link>
                ))}
              </div>
              
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border shadow-elegant z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg min-w-[60px] transition-colors ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
             >
               <item.icon className="h-5 w-5" />
               {item.name && <span className="text-xs font-medium">{item.name}</span>}
             </Link>
          ))}
          
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}