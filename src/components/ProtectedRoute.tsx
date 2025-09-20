import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  allowClerk?: boolean;
}

export function ProtectedRoute({ children, requiredRole, allowClerk = true }: ProtectedRouteProps) {
  const { isAuthenticated, userRole, isClerkUser } = useAuth();

  // If Clerk user and allowClerk is true, allow access
  if (isClerkUser && allowClerk) {
    return <>{children}</>;
  }

  // If not authenticated with role-based auth, show access denied
  if (!isAuthenticated || !userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-xl text-destructive">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You need to authenticate to access this page.
            </p>
            <div className="space-y-2">
              <Link to="/role-login" className="block">
                <Button className="w-full">Role-based Login</Button>
              </Link>
              <Link to="/auth" className="block">
                <Button variant="outline" className="w-full">Clerk Authentication</Button>
              </Link>
              <Link to="/" className="block">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If specific role required and user doesn't have it
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-warning/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-warning" />
            </div>
            <CardTitle className="text-xl text-warning">Insufficient Permissions</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You need {requiredRole} role to access this page.
              <br />
              Current role: {userRole}
            </p>
            <Link to="/" className="block">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}