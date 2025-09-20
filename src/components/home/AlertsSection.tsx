import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Cloud, TrendingDown, ChevronRight } from "lucide-react";
import { mockData } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function AlertsSection() {
  const alerts = mockData.alerts;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'pest':
        return <AlertTriangle className="h-4 w-4" />;
      case 'weather':
        return <Cloud className="h-4 w-4" />;
      case 'market':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Critical Alerts</h2>
        <Button variant="ghost" size="sm">
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-3">
        {alerts.slice(0, 3).map((alert) => (
          <Alert 
            key={alert.id} 
            variant={getAlertColor(alert.severity) as any}
            className="border-l-4"
          >
            <div className="flex items-start gap-3">
              <div className={cn("mt-0.5", getSeverityColor(alert.severity))}>
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <AlertTitle className="text-sm font-semibold mb-1">
                      {alert.title}
                    </AlertTitle>
                    <AlertDescription className="text-sm text-muted-foreground mb-2">
                      {alert.description}
                    </AlertDescription>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-xs">
                        {alert.location}
                      </Badge>
                      <span className="text-muted-foreground">
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant={getAlertColor(alert.severity) as any}
                    className="text-xs"
                  >
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            </div>
          </Alert>
        ))}
      </div>

      {alerts.length > 3 && (
        <Button variant="outline" className="w-full mt-4" size="sm">
          View {alerts.length - 3} more alerts
        </Button>
      )}
    </div>
  );
}