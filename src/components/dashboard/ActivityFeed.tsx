import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Bell
} from "lucide-react";

interface Activity {
  id: string;
  type: "diagnosis" | "sale" | "purchase" | "alert" | "system" | "user" | "order";
  title: string;
  description: string;
  timestamp: string;
  status?: "success" | "warning" | "error" | "info";
  actionable?: boolean;
  priority?: "high" | "medium" | "low";
}

interface ActivityFeedProps {
  userType?: "farmer" | "seller" | "admin";
  limit?: number;
}

export function ActivityFeed({ userType = "farmer", limit = 5 }: ActivityFeedProps) {
  const getFarmerActivities = (): Activity[] => [
    {
      id: "1",
      type: "diagnosis",
      title: "Disease Detected in Tomato Crop",
      description: "Early blight identified. Treatment recommendations provided.",
      timestamp: "2 hours ago",
      status: "warning",
      actionable: true,
      priority: "high"
    },
    {
      id: "2",
      type: "sale",
      title: "Wheat Crop Sold Successfully",
      description: "5 quintal sold at ₹3,200 per quintal to AgriCorp Ltd",
      timestamp: "1 day ago",
      status: "success",
      priority: "medium"
    },
    {
      id: "3",
      type: "purchase",
      title: "NPK Fertilizer Delivered",
      description: "50kg bag of NPK fertilizer delivered to your farm",
      timestamp: "2 days ago",
      status: "success",
      priority: "low"
    },
    {
      id: "4",
      type: "alert",
      title: "Weather Alert",
      description: "Heavy rainfall expected in next 24 hours. Protect crops.",
      timestamp: "3 days ago",
      status: "warning",
      actionable: true,
      priority: "high"
    },
    {
      id: "5",
      type: "diagnosis",
      title: "Healthy Crop Scan",
      description: "Your rice crop shows excellent health indicators",
      timestamp: "1 week ago",
      status: "success",
      priority: "low"
    }
  ];

  const getSellerActivities = (): Activity[] => [
    {
      id: "1",
      type: "order",
      title: "New Order Received",
      description: "Premium Tomatoes - 50kg ordered by Rahul Sharma",
      timestamp: "30 minutes ago",
      status: "info",
      actionable: true,
      priority: "high"
    },
    {
      id: "2",
      type: "sale",
      title: "Product Sold",
      description: "NPK Fertilizer sold to Sunita Devi - ₹1,700",
      timestamp: "2 hours ago",
      status: "success",
      priority: "medium"
    },
    {
      id: "3",
      type: "system",
      title: "Low Stock Alert",
      description: "Organic Wheat Seeds - Only 5 units remaining",
      timestamp: "5 hours ago",
      status: "warning",
      actionable: true,
      priority: "medium"
    },
    {
      id: "4",
      type: "order",
      title: "Order Delivered",
      description: "Premium Tomatoes delivered successfully",
      timestamp: "1 day ago",
      status: "success",
      priority: "low"
    },
    {
      id: "5",
      type: "user",
      title: "New Product Review",
      description: "4.8 stars received for Premium Tomatoes",
      timestamp: "2 days ago",
      status: "success",
      priority: "low"
    }
  ];

  const getAdminActivities = (): Activity[] => [
    {
      id: "1",
      type: "user",
      title: "New User Registration",
      description: "Farmer from Punjab registered and verified",
      timestamp: "15 minutes ago",
      status: "success",
      priority: "low"
    },
    {
      id: "2",
      type: "system",
      title: "System Health Check",
      description: "All systems operational. 99.9% uptime maintained",
      timestamp: "1 hour ago",
      status: "success",
      priority: "low"
    },
    {
      id: "3",
      type: "alert",
      title: "High Traffic Alert",
      description: "AI diagnosis service experiencing high demand",
      timestamp: "3 hours ago",
      status: "warning",
      priority: "medium"
    },
    {
      id: "4",
      type: "order",
      title: "Platform Revenue Milestone",
      description: "Monthly revenue target of ₹10L achieved",
      timestamp: "6 hours ago",
      status: "success",
      priority: "high"
    },
    {
      id: "5",
      type: "system",
      title: "Database Backup Completed",
      description: "Automated backup completed successfully",
      timestamp: "12 hours ago",
      status: "success",
      priority: "low"
    }
  ];

  const getActivities = () => {
    switch (userType) {
      case "seller":
        return getSellerActivities();
      case "admin":
        return getAdminActivities();
      default:
        return getFarmerActivities();
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "diagnosis":
        return Camera;
      case "sale":
      case "order":
        return ShoppingCart;
      case "purchase":
        return Package;
      case "alert":
        return AlertTriangle;
      case "system":
        return CheckCircle;
      case "user":
        return Users;
      default:
        return TrendingUp;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "text-success bg-success/10";
      case "warning":
        return "text-warning bg-warning/10";
      case "error":
        return "text-destructive bg-destructive/10";
      default:
        return "text-info bg-info/10";
    }
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="text-xs">Low</Badge>;
      default:
        return null;
    }
  };

  const activities = getActivities().slice(0, limit);

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Recent Activity
          </div>
          <Badge variant="secondary" className="text-xs">
            {activities.length} updates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-3 bg-accent/30 rounded-lg">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(activity.status)}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(activity.priority)}
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  
                  {activity.actionable && (
                    <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="ghost" className="w-full text-sm">
            View All Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}