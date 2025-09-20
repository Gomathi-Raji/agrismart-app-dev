import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { NotificationCenter } from '@/components/dashboard/NotificationCenter';
import { 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  FileText, 
  AlertTriangle,
  Activity,
  UserCheck,
  UserX,
  TrendingUp,
  Database,
  Bell,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for demonstration
const initialUsers = [
  { id: 1, name: 'John Farmer', email: 'john@farm.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: 'Sarah Seller', email: 'sarah@seller.com', role: 'seller', status: 'active', joinDate: '2024-01-20' },
  { id: 3, name: 'Mike Producer', email: 'mike@produce.com', role: 'user', status: 'inactive', joinDate: '2024-02-01' },
  { id: 4, name: 'Lisa Market', email: 'lisa@market.com', role: 'seller', status: 'pending', joinDate: '2024-02-10' },
];

const mockStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalSellers: 156,
  activeSellers: 134,
  totalRevenue: '$24,567',
  monthlyGrowth: '+12.5%'
};

const mockSystemHealth = {
  uptime: '99.9%',
  responseTime: '120ms',
  errorRate: '0.02%',
  lastBackup: '2 hours ago'
};

export default function Admin() {
  // CRUD state for users
  const [users, setUsers] = useState(initialUsers);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editUserId, setEditUserId] = useState<number|null>(null);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    joinDate: ''
  });

  // Add user handler
  const handleAddUser = () => {
    if (!userForm.name || !userForm.email) return;
    const newUser = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      ...userForm
    };
    setUsers([...users, newUser]);
    setShowUserForm(false);
    setUserForm({ name: '', email: '', role: 'user', status: 'active', joinDate: '' });
  };

  // Edit user handler
  const handleEditUser = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setEditUserId(id);
      setUserForm({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        joinDate: user.joinDate
      });
      setShowUserForm(true);
    }
  };

  // Update user handler
  const handleUpdateUser = () => {
    setUsers(users.map(u => u.id === editUserId ? {
      ...u,
      ...userForm
    } : u));
    setEditUserId(null);
    setShowUserForm(false);
    setUserForm({ name: '', email: '', role: 'user', status: 'active', joinDate: '' });
  };

  // Delete user handler
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleDeleteUser = () => {
    if (userToDelete === null) return;
    setUsers(users.filter(u => u.id !== userToDelete));
    setUserToDelete(null);
    toast({
      title: "User deleted successfully",
      description: "The user account has been permanently removed.",
    });
  };

  // Form change handler
  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const { userRole, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const StatsCard = ({ title, value, icon: Icon, trend }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">{trend}</span> from last month
          </p>
        )}
      </CardContent>
    </Card>
  );

  const UserRow = ({ user }: any) => (
    <div className="grid grid-cols-6 gap-4 p-4 items-center border-t hover:bg-muted/30 transition-colors">
      <div className="col-span-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </div>
      <div>
        <Badge variant={user.role === 'seller' ? 'default' : 'secondary'} className="capitalize">
          {user.role}
        </Badge>
      </div>
      <div>
        <Badge 
          variant={
            user.status === 'active' ? 'success' : 
            user.status === 'pending' ? 'warning' : 
            'secondary'
          }
          className="capitalize"
        >
          {user.status}
        </Badge>
      </div>
      <div className="text-muted-foreground text-sm">
        {user.joinDate}
      </div>
      <div className="flex justify-end gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => handleEditUser(user.id)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Delete User Account
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {user.name}'s account? This action cannot be undone
                and will permanently remove all their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => {
                  setUserToDelete(user.id);
                  handleDeleteUser();
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your agricultural platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-primary/10">
                <Shield className="h-3 w-3 mr-1" />
                Administrator
              </Badge>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Dashboard Metrics */}
            <DashboardMetrics userType="admin" />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Revenue Chart */}
                <RevenueChart userType="admin" />

                {/* System Health */}
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-primary" />
                      <span>System Health</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <p className="text-2xl font-bold text-success">{mockSystemHealth.uptime}</p>
                        <p className="text-xs text-muted-foreground">Uptime</p>
                      </div>
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <p className="text-2xl font-bold text-info">{mockSystemHealth.responseTime}</p>
                        <p className="text-xs text-muted-foreground">Response Time</p>
                      </div>
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <p className="text-2xl font-bold text-success">{mockSystemHealth.errorRate}</p>
                        <p className="text-xs text-muted-foreground">Error Rate</p>
                      </div>
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <p className="text-sm font-bold text-muted-foreground">{mockSystemHealth.lastBackup}</p>
                        <p className="text-xs text-muted-foreground">Last Backup</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <QuickActions userType="admin" />
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Activity Feed */}
                <ActivityFeed userType="admin" limit={6} />

                {/* Notification Center */}
                <NotificationCenter userType="admin" />
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button onClick={() => { setShowUserForm(true); setEditUserId(null); setUserForm({ name: '', email: '', role: 'user', status: 'active', joinDate: '' }); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            {/* User Form Modal */}
            {showUserForm && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md border">
                  <div className="flex items-center gap-2 mb-6">
                    {editUserId ? <Edit className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}
                    <h2 className="text-xl font-semibold text-card-foreground">{editUserId ? 'Edit User' : 'Add User'}</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={userForm.name} 
                        onChange={handleUserFormChange} 
                        placeholder="Enter full name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={userForm.email} 
                        onChange={handleUserFormChange} 
                        placeholder="Enter email address" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select name="role" value={userForm.role} onValueChange={(value) => handleUserFormChange({ target: { name: 'role', value } })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="seller">Seller</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select name="status" value={userForm.status} onValueChange={(value) => handleUserFormChange({ target: { name: 'status', value } })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joinDate">Join Date</Label>
                      <Input 
                        id="joinDate" 
                        name="joinDate" 
                        type="date" 
                        value={userForm.joinDate} 
                        onChange={handleUserFormChange} 
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button 
                      variant="default" 
                      className="flex-1" 
                      onClick={editUserId ? handleUpdateUser : handleAddUser}
                    >
                      {editUserId ? 'Update' : 'Add'} User
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      onClick={() => { 
                        setShowUserForm(false); 
                        setEditUserId(null); 
                        setUserForm({ name: '', email: '', role: 'user', status: 'active', joinDate: '' }); 
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 gap-4 p-4 bg-muted/50 text-sm font-medium">
                    <div className="col-span-2">User</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div>Join Date</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y divide-border">
                    {users
                      .filter(user => 
                        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(user => (
                        <UserRow key={user.id} user={user} />
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Published</span>
                      <Badge>24</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Drafts</span>
                      <Badge variant="secondary">7</Badge>
                    </div>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Government Schemes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active</span>
                      <Badge>12</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Expired</span>
                      <Badge variant="outline">3</Badge>
                    </div>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Scheme
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Products</span>
                      <Badge>156</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending</span>
                      <Badge variant="secondary">8</Badge>
                    </div>
                    <Button className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Manage Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Database Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button className="w-full" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Optimize Tables
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Logs
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">98.5%</p>
                      <p className="text-xs text-muted-foreground">CPU Usage</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">67%</p>
                      <p className="text-xs text-muted-foreground">Memory</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-600">45GB</p>
                      <p className="text-xs text-muted-foreground">Storage</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-orange-600">1.2GB</p>
                      <p className="text-xs text-muted-foreground">Network</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" placeholder="Krishi Sahayak" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea id="siteDescription" placeholder="Agricultural support platform..." />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Switch id="emailNotifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <Switch id="pushNotifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <Switch id="smsNotifications" />
                  </div>
                  <Button>Update Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}