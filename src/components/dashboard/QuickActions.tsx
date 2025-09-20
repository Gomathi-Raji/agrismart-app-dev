import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  ShoppingCart, 
  TrendingUp, 
  Cloud, 
  Users, 
  Package,
  Bell,
  Settings,
  BarChart3,
  FileText,
  MessageCircle,
  Plus,
  Eye,
  Edit,
  Upload,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary";
  badge?: string;
  featured?: boolean;
}

interface QuickActionsProps {
  userType?: "farmer" | "seller" | "admin";
}

export function QuickActions({ userType = "farmer" }: QuickActionsProps) {
  const navigate = useNavigate();

  const getFarmerActions = (): QuickAction[] => [
    {
      id: "1",
      title: "Scan Plant Disease",
      description: "AI-powered crop health analysis",
      icon: Camera,
      path: "/diagnose",
      variant: "default",
      featured: true
    },
    {
      id: "2",
      title: "Check Market Prices",
      description: "Real-time crop prices",
      icon: TrendingUp,
      path: "/market-analysis",
      variant: "outline"
    },
    {
      id: "3",
      title: "Weather Forecast",
      description: "7-day farming weather",
      icon: Cloud,
      path: "/weather",
      variant: "outline"
    },
    {
      id: "4",
      title: "Buy Seeds & Tools",
      description: "Browse marketplace",
      icon: ShoppingCart,
      path: "/buy",
      variant: "outline",
      badge: "New"
    },
    {
      id: "5",
      title: "Sell Your Crops",
      description: "List on marketplace",
      icon: Upload,
      path: "/seller-panel",
      variant: "secondary"
    },
    {
      id: "6",
      title: "Get Recommendations",
      description: "AI crop suggestions",
      icon: MessageCircle,
      path: "/recommendations",
      variant: "outline"
    }
  ];

  const getSellerActions = (): QuickAction[] => [
    {
      id: "1",
      title: "Add New Product",
      description: "List new items for sale",
      icon: Plus,
      onClick: () => navigate("/seller-panel"),
      variant: "default",
      featured: true
    },
    {
      id: "2",
      title: "Manage Orders",
      description: "View and process orders",
      icon: Package,
      path: "/seller-panel",
      variant: "outline",
      badge: "3 pending"
    },
    {
      id: "3",
      title: "View Analytics",
      description: "Sales performance data",
      icon: BarChart3,
      path: "/seller-panel",
      variant: "outline"
    },
    {
      id: "4",
      title: "Update Inventory",
      description: "Manage stock levels",
      icon: Edit,
      path: "/seller-panel",
      variant: "outline"
    },
    {
      id: "5",
      title: "Customer Messages",
      description: "Respond to inquiries",
      icon: MessageCircle,
      path: "/seller-panel",
      variant: "secondary",
      badge: "2 new"
    },
    {
      id: "6",
      title: "Export Reports",
      description: "Download sales data",
      icon: Download,
      onClick: () => console.log("Exporting reports..."),
      variant: "outline"
    }
  ];

  const getAdminActions = (): QuickAction[] => [
    {
      id: "1",
      title: "User Management",
      description: "Manage farmers and sellers",
      icon: Users,
      path: "/admin",
      variant: "default",
      featured: true
    },
    {
      id: "2",
      title: "System Monitor",
      description: "Check system health",
      icon: BarChart3,
      path: "/admin",
      variant: "outline"
    },
    {
      id: "3",
      title: "Content Management",
      description: "Manage blogs and schemes",
      icon: FileText,
      path: "/admin",
      variant: "outline"
    },
    {
      id: "4",
      title: "Platform Settings",
      description: "Configure system settings",
      icon: Settings,
      path: "/admin",
      variant: "outline"
    },
    {
      id: "5",
      title: "View Reports",
      description: "Analytics and insights",
      icon: Eye,
      path: "/admin",
      variant: "secondary"
    },
    {
      id: "6",
      title: "Notifications",
      description: "Send platform alerts",
      icon: Bell,
      path: "/admin",
      variant: "outline",
      badge: "Send"
    }
  ];

  const getActions = () => {
    switch (userType) {
      case "seller":
        return getSellerActions();
      case "admin":
        return getAdminActions();
      default:
        return getFarmerActions();
    }
  };

  const handleActionClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.path) {
      navigate(action.path);
    }
  };

  const actions = getActions();

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={action.id}
                variant={action.variant || "outline"}
                onClick={() => handleActionClick(action)}
                className={`h-auto p-4 flex flex-col items-center gap-3 relative ${
                  action.featured ? "border-primary shadow-md" : ""
                }`}
              >
                {action.badge && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 text-xs px-2 py-1"
                  >
                    {action.badge}
                  </Badge>
                )}
                
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  action.featured 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-accent text-foreground"
                }`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                
                <div className="text-center">
                  <h4 className="font-medium text-sm mb-1">{action.title}</h4>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}