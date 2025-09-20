import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  BarChart3,
  Activity,
  Target
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  icon: React.ElementType;
  description?: string;
  color?: "primary" | "success" | "warning" | "destructive";
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon, 
  description,
  color = "primary" 
}: MetricCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "success":
        return "text-success bg-success/10";
      case "warning":
        return "text-warning bg-warning/10";
      case "destructive":
        return "text-destructive bg-destructive/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  const getTrendIcon = () => {
    if (changeType === "increase") return <TrendingUp className="h-3 w-3 text-success" />;
    if (changeType === "decrease") return <TrendingDown className="h-3 w-3 text-destructive" />;
    return null;
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold">{value}</p>
              {change !== undefined && (
                <div className="flex items-center space-x-1">
                  {getTrendIcon()}
                  <span className={`text-xs font-medium ${
                    changeType === "increase" ? "text-success" : 
                    changeType === "decrease" ? "text-destructive" : 
                    "text-muted-foreground"
                  }`}>
                    {change > 0 ? "+" : ""}{change}%
                  </span>
                </div>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardMetricsProps {
  userType?: "farmer" | "seller" | "admin";
}

export function DashboardMetrics({ userType = "farmer" }: DashboardMetricsProps) {
  const getFarmerMetrics = () => [
    {
      title: "Total Diagnoses",
      value: 24,
      change: 12.5,
      changeType: "increase" as const,
      icon: Activity,
      description: "AI plant health checks",
      color: "primary" as const
    },
    {
      title: "Crop Sales",
      value: "₹1.2L",
      change: 8.3,
      changeType: "increase" as const,
      icon: DollarSign,
      description: "This month's revenue",
      color: "success" as const
    },
    {
      title: "Farm Health Score",
      value: "92%",
      change: 5.2,
      changeType: "increase" as const,
      icon: Target,
      description: "Overall farm condition",
      color: "success" as const
    },
    {
      title: "Market Price Alert",
      value: "₹3,200",
      change: -2.1,
      changeType: "decrease" as const,
      icon: TrendingUp,
      description: "Rice per quintal",
      color: "warning" as const
    }
  ];

  const getSellerMetrics = () => [
    {
      title: "Total Products",
      value: 23,
      change: 15.3,
      changeType: "increase" as const,
      icon: Package,
      description: "Active listings",
      color: "primary" as const
    },
    {
      title: "Monthly Revenue",
      value: "₹2.4L",
      change: 22.1,
      changeType: "increase" as const,
      icon: DollarSign,
      description: "Sales this month",
      color: "success" as const
    },
    {
      title: "Orders",
      value: 156,
      change: 8.7,
      changeType: "increase" as const,
      icon: BarChart3,
      description: "Total orders",
      color: "primary" as const
    },
    {
      title: "Customer Rating",
      value: "4.8",
      change: 0.2,
      changeType: "increase" as const,
      icon: Target,
      description: "Average rating",
      color: "success" as const
    }
  ];

  const getAdminMetrics = () => [
    {
      title: "Total Users",
      value: "1,247",
      change: 12.5,
      changeType: "increase" as const,
      icon: Users,
      description: "Registered farmers",
      color: "primary" as const
    },
    {
      title: "Platform Revenue",
      value: "₹12.5L",
      change: 18.3,
      changeType: "increase" as const,
      icon: DollarSign,
      description: "Monthly revenue",
      color: "success" as const
    },
    {
      title: "Active Listings",
      value: "2,890",
      change: 7.2,
      changeType: "increase" as const,
      icon: Package,
      description: "Products available",
      color: "primary" as const
    },
    {
      title: "AI Diagnoses",
      value: "5,234",
      change: 25.1,
      changeType: "increase" as const,
      icon: Activity,
      description: "This month",
      color: "success" as const
    }
  ];

  const getMetrics = () => {
    switch (userType) {
      case "seller":
        return getSellerMetrics();
      case "admin":
        return getAdminMetrics();
      default:
        return getFarmerMetrics();
    }
  };

  const metrics = getMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}