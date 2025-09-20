import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Camera, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  BookOpen, 
  Headphones 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function QuickActionsGrid() {
  const navigate = useNavigate();

  const actions = [
    {
      id: "diagnose",
      title: "Diagnose Crop",
      icon: Camera,
      route: "/diagnose",
      emoji: "🧪",
      description: "AI crop analysis"
    },
    {
      id: "marketplace",
      title: "Marketplace",
      icon: ShoppingCart,
      route: "/buy",
      emoji: "🛒",
      description: "Buy & sell crops",
      featured: true
    },
    {
      id: "community",
      title: "Community",
      icon: Users,
      route: "/community",
      emoji: "👥",
      description: "Connect with farmers"
    },
    {
      id: "reports",
      title: "Reports & Insights",
      icon: BarChart3,
      route: "/market-analysis",
      emoji: "📊",
      description: "Analytics dashboard"
    },
    {
      id: "knowledge",
      title: "Knowledge Hub",
      icon: BookOpen,
      route: "/blog",
      emoji: "📚",
      description: "Learning resources"
    },
    {
      id: "support",
      title: "Support",
      icon: Headphones,
      route: "/support",
      emoji: "📞",
      description: "Get help 24/7"
    }
  ];

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action) => {
          const IconComponent = action.icon;
          
          if (action.featured) {
            return (
              <Card 
                key={action.id} 
                className="col-span-2 lg:col-span-1 bg-gradient-primary border-0 shadow-glow hover:shadow-primary transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(action.route)}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">{action.emoji}</span>
                  </div>
                  <h3 className="font-bold text-primary-foreground mb-1">{action.title}</h3>
                  <p className="text-sm text-primary-foreground/80">{action.description}</p>
                </CardContent>
              </Card>
            );
          }

          return (
            <Card 
              key={action.id}
              className="bg-card hover:bg-accent/50 border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => navigate(action.route)}
            >
              <CardContent className="p-4 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-3 group-hover:scale-105 transition-transform">
                  <span className="text-lg">{action.emoji}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{action.title}</h3>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}