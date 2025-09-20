import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/clerk-react';

export type UserRole = 'admin' | 'seller' | 'user' | null;

interface AuthContextType {
  userRole: UserRole;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isClerkUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generated credentials
const CREDENTIALS = {
  admin: { username: 'admin_agri', password: 'AgriAdmin@2024' },
  seller: { username: 'seller_pro', password: 'SellPro@2024' },
  user: { username: 'farmer_user', password: 'FarmUser@2024' }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    // Check localStorage for existing role-based auth
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole) {
      setUserRole(savedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string, role: UserRole): boolean => {
    if (!role || !CREDENTIALS[role]) return false;
    
    const { username: validUsername, password: validPassword } = CREDENTIALS[role];
    
    if (username === validUsername && password === validPassword) {
      setUserRole(role);
      setIsAuthenticated(true);
      localStorage.setItem('userRole', role);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{
      userRole,
      isAuthenticated: isAuthenticated || isSignedIn,
      login,
      logout,
      isClerkUser: isSignedIn
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}