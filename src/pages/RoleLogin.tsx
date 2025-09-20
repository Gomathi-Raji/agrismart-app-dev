import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Leaf, Shield, Store, User, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RoleLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(null);
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Please select a role');
      return;
    }

    if (login(username, password, role)) {
      toast({
        title: "Login Successful",
        description: `Welcome, ${role}!`,
      });
      
      // Navigate to appropriate panel
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'seller':
          navigate('/seller-panel');
          break;
        case 'user':
          navigate('/user-profile');
          break;
      }
    } else {
      setError('Invalid credentials for the selected role');
    }
  };

  const roleIcons = {
    admin: Shield,
    seller: Store,
    user: User
  };

  const credentials = {
    admin: { username: 'admin_agri', password: 'AgriAdmin@2024' },
    seller: { username: 'seller_pro', password: 'SellPro@2024' },
    user: { username: 'farmer_user', password: 'FarmUser@2024' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/lovable-uploads/logo.png" 
              alt="AgriSmart Logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="font-bold text-2xl text-primary">AgriSmart</span>
          </Link>
          <p className="text-muted-foreground">Role-based Authentication</p>
        </div>

        <Card>
          <CardHeader className="text-center pb-4">
            <CardTitle>Login with Role Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="role">Select Role</Label>
                <Select value={role || ''} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Administrator</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="seller">
                      <div className="flex items-center space-x-2">
                        <Store className="h-4 w-4" />
                        <span>Seller</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="user">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Farmer/User</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setShowCredentials(!showCredentials)}
                className="w-full"
              >
                {showCredentials ? 'Hide' : 'Show'} Demo Credentials
              </Button>

              {showCredentials && (
                <div className="bg-muted/50 p-4 rounded-lg space-y-3 text-sm">
                  <p className="font-semibold text-center">Demo Credentials:</p>
                  {Object.entries(credentials).map(([roleKey, cred]) => (
                    <div key={roleKey} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {React.createElement(roleIcons[roleKey as UserRole], { className: "h-4 w-4" })}
                        <span className="font-medium capitalize">{roleKey}:</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <p>Username: <code className="bg-background px-1 rounded">{cred.username}</code></p>
                        <p>Password: <code className="bg-background px-1 rounded">{cred.password}</code></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center">
                <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary">
                  Or use Clerk Authentication →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}