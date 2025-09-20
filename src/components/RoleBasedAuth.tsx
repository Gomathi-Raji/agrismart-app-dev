import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Shield, UserCog, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RoleBasedAuth() {
  const { isAuthenticated, userRole, isClerkUser } = useAuth();

  // If user is authenticated with Clerk, don't show role-based auth
  if (isClerkUser) {
    return null;
  }

  // If user is authenticated with role-based auth, show role badge
  if (isAuthenticated && userRole) {
    return (
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
        <Shield className="h-3 w-3 mr-1" />
        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </Badge>
    );
  }

  // If not authenticated, show login options
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden md:flex">
          <LogIn className="h-4 w-4 mr-2" />
          Role Login
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card border border-border">
        <DropdownMenuLabel>Quick Access</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/role-login" className="cursor-pointer">
            <UserCog className="mr-2 h-4 w-4" />
            <span>Farmer Login</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/seller-panel" className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>Seller Panel</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/admin" className="cursor-pointer">
            <Shield className="mr-2 h-4 w-4" />
            <span>Admin Panel</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}