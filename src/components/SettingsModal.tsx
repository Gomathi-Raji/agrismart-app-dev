import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useUser, useClerk } from "@clerk/clerk-react";
import { toast } from "sonner";
import { 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  User, 
  Mail,
  Smartphone,
  Key,
  LogOut,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  MapPin,
  Camera,
  Settings,
  AlertTriangle,
  Check,
  X
} from "lucide-react";

interface UserFormData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

interface SessionData {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [formData, setFormData] = useState<UserFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const handleSignOut = async () => {
    try {
      setIsSubmitting(true);
      await signOut();
      toast.success("Signed out successfully");
      onOpenChange(false);
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error(
        error instanceof Error 
          ? `Failed to sign out: ${error.message}` 
          : "Failed to sign out. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsSubmitting(true);
      if (!user) {
        throw new Error("No user found");
      }

      // Add confirmation check
      const confirmDelete = window.confirm(
        "Are you absolutely sure you want to delete your account? This action cannot be undone."
      );
      
      if (!confirmDelete) {
        return;
      }

      await user.delete();
      toast.success("Account deleted successfully");
      onOpenChange(false);
    } catch (error) {
      console.error("Account deletion error:", error);
      toast.error(
        error instanceof Error 
          ? `Failed to delete account: ${error.message}` 
          : "Failed to delete account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate form data
      if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
        toast.error("First name and last name are required");
        return;
      }

      if (formData.phoneNumber && !/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
        toast.error("Please enter a valid phone number");
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user data
      if (user) {
        // Here you would typically call your update API
        // await updateUserProfile(user.id, formData);
      }

      toast.success("Profile updated successfully");
      onOpenChange(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const mockSessions: SessionData[] = [
    {
      id: "1",
      device: "Chrome on Windows",
      location: "New York, USA",
      lastActive: "Active now",
      current: true
    },
    {
      id: "2", 
      device: "Safari on iPhone",
      location: "San Francisco, USA",
      lastActive: "2 hours ago",
      current: false
    }
  ];

  if (!isLoaded) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <div className="mt-6 max-h-[70vh] overflow-y-auto">
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <Avatar className="w-20 h-20 ring-2 ring-background">
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback className="text-lg bg-primary/10 text-primary">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="text-white" onClick={() => openUserProfile()}>
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" onClick={() => openUserProfile()}>
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-medium">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName || user?.firstName || ""} 
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Enter first name"
                        className="bg-card"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-medium">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName || user?.lastName || ""} 
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Enter last name"
                        className="bg-card"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-medium">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue={user?.primaryEmailAddress?.emailAddress || ""} 
                          disabled
                          className="bg-muted"
                        />
                        <Badge 
                          variant={user?.primaryEmailAddress?.verification?.status === "verified" ? "default" : "secondary"}
                          className={user?.primaryEmailAddress?.verification?.status === "verified" ? "bg-success/10 text-success-foreground" : "bg-warning/10 text-warning-foreground"}
                        >
                          {user?.primaryEmailAddress?.verification?.status === "verified" ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Verified
                            </>
                          ) : (
                            <>
                              <X className="h-3 w-3 mr-1" />
                              Unverified
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-medium">Phone Number</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={formData.phoneNumber || user?.primaryPhoneNumber?.phoneNumber || ""} 
                          onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                          placeholder="+1 234 567 8900"
                          className="bg-card"
                        />
                        <Badge 
                          variant={user?.primaryPhoneNumber?.verification?.status === "verified" ? "default" : "secondary"}
                          className={user?.primaryPhoneNumber?.verification?.status === "verified" ? "bg-success/10 text-success-foreground" : "bg-warning/10 text-warning-foreground"}
                        >
                          {user?.primaryPhoneNumber?.verification?.status === "verified" ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Verified
                            </>
                          ) : (
                            <>
                              <X className="h-3 w-3 mr-1" />
                              Unverified
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t">
                    <Button 
                      onClick={handleUpdateProfile} 
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Update Profile
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Password */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Password</Label>
                        <p className="text-sm text-muted-foreground">
                          Change your account password
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => openUserProfile()}>
                        <Key className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Two-Factor Authentication */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
                          {twoFactorEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        >
                          {twoFactorEnabled ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Backup Codes */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Backup Codes</Label>
                        <p className="text-sm text-muted-foreground">
                          Generate backup codes for account recovery
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Generate Codes
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Login Notifications */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Login Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when your account is accessed
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sessions Tab */}
            <TabsContent value="sessions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Active Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <Smartphone className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{session.device}</p>
                            {session.current && (
                              <Badge variant="default" className="text-xs">Current</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {session.location}
                            </span>
                            <span>{session.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="outline" size="sm">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out of All Other Sessions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about weather alerts and market updates
                      </p>
                    </div>
                    <Switch 
                      checked={notifications} 
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get weekly reports and important updates via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive critical alerts via SMS
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Appearance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark theme
                      </p>
                    </div>
                    <Switch 
                      checked={theme === "dark"} 
                      onCheckedChange={toggleTheme}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Language & Region */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Language & Region
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="inr">INR (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Account Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Account Information */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">Account ID</Label>
                      <p className="text-sm text-muted-foreground mt-1">{user?.id}</p>
                    </div>
                    <div>
                      <Label className="text-base">Member Since</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-base">Last Updated</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Data Export */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Export Data</Label>
                        <p className="text-sm text-muted-foreground">
                          Download a copy of your account data
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Export Data
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Sign Out */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Sign Out</Label>
                        <p className="text-sm text-muted-foreground">
                          Sign out of your account on this device
                        </p>
                      </div>
                      <Button variant="outline" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Danger Zone */}
                  <div className="space-y-4 p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                    <div>
                      <Label className="text-base text-destructive flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Danger Zone
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Irreversible and destructive actions
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Delete Account</Label>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove all your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Yes, delete my account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}