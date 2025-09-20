import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  X, 
  Settings,
  CloudRain,
  TrendingUp,
  Package,
  Users
} from "lucide-react";

interface Notification {
  id: string;
  type: "weather" | "market" | "system" | "order" | "alert";
  title: string;
  message: string;
  timestamp: string;
  priority: "high" | "medium" | "low";
  read: boolean;
  actionable?: boolean;
}

interface NotificationCenterProps {
  userType?: "farmer" | "seller" | "admin";
}

export function NotificationCenter({ userType = "farmer" }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(getInitialNotifications());
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    weather: true,
    market: true,
    orders: true,
    system: false,
    marketing: false
  });

  function getInitialNotifications(): Notification[] {
    const farmerNotifications: Notification[] = [
      {
        id: "1",
        type: "weather",
        title: "Weather Alert",
        message: "Heavy rainfall expected in your area. Protect crops from waterlogging.",
        timestamp: "2 hours ago",
        priority: "high",
        read: false,
        actionable: true
      },
      {
        id: "2",
        type: "market",
        title: "Price Alert",
        message: "Rice prices increased by 12% - Good time to sell your harvest",
        timestamp: "4 hours ago",
        priority: "medium",
        read: false,
        actionable: true
      },
      {
        id: "3",
        type: "system",
        title: "Diagnosis Complete",
        message: "Your tomato plant analysis is ready with treatment recommendations",
        timestamp: "1 day ago",
        priority: "medium",
        read: true
      },
      {
        id: "4",
        type: "alert",
        title: "Fertilizer Reminder",
        message: "Time to apply NPK fertilizer to your wheat crop",
        timestamp: "2 days ago",
        priority: "low",
        read: true
      }
    ];

    const sellerNotifications: Notification[] = [
      {
        id: "1",
        type: "order",
        title: "New Order",
        message: "Premium Tomatoes - 50kg ordered by Rahul Sharma",
        timestamp: "30 minutes ago",
        priority: "high",
        read: false,
        actionable: true
      },
      {
        id: "2",
        type: "system",
        title: "Low Stock Alert",
        message: "Organic Wheat Seeds - Only 5 units remaining",
        timestamp: "2 hours ago",
        priority: "medium",
        read: false,
        actionable: true
      },
      {
        id: "3",
        type: "order",
        title: "Payment Received",
        message: "₹2,250 payment received for Premium Tomatoes order",
        timestamp: "1 day ago",
        priority: "low",
        read: true
      }
    ];

    const adminNotifications: Notification[] = [
      {
        id: "1",
        type: "system",
        title: "System Alert",
        message: "High server load detected - Consider scaling up resources",
        timestamp: "1 hour ago",
        priority: "high",
        read: false,
        actionable: true
      },
      {
        id: "2",
        type: "order",
        title: "Revenue Milestone",
        message: "Platform crossed ₹10L monthly revenue milestone",
        timestamp: "3 hours ago",
        priority: "medium",
        read: false
      },
      {
        id: "3",
        type: "system",
        title: "New User Registration",
        message: "50 new farmers registered today - 15% increase from yesterday",
        timestamp: "6 hours ago",
        priority: "low",
        read: true
      }
    ];

    switch (userType) {
      case "seller":
        return sellerNotifications;
      case "admin":
        return adminNotifications;
      default:
        return farmerNotifications;
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "weather":
        return CloudRain;
      case "market":
        return TrendingUp;
      case "order":
        return Package;
      case "system":
        return Info;
      case "alert":
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive bg-destructive/10";
      case "medium":
        return "text-warning bg-warning/10";
      default:
        return "text-info bg-info/10";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showSettings && (
          <div className="mb-6 p-4 bg-accent/30 rounded-lg space-y-3">
            <h4 className="font-medium text-sm">Notification Settings</h4>
            <div className="space-y-2">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key} Notifications</span>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    notification.read 
                      ? "bg-background border-border" 
                      : "bg-accent/50 border-primary/20"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPriorityColor(notification.priority)}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                        
                        {notification.actionable && (
                          <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="opacity-50 hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}