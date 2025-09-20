import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Calendar,
  MapPin,
  AlertTriangle
} from "lucide-react";

export default function MarketAnalysis() {
  const priceData = [
    { 
      crop: "Tomatoes", 
      currentPrice: 45, 
      change: 12.5, 
      trend: "up", 
      market: "Pune APMC",
      forecast: "Stable" 
    },
    { 
      crop: "Wheat", 
      currentPrice: 2150, 
      change: -3.2, 
      trend: "down", 
      market: "Delhi",
      forecast: "Declining" 
    },
    { 
      crop: "Rice", 
      currentPrice: 3200, 
      change: 8.7, 
      trend: "up", 
      market: "Mumbai",
      forecast: "Rising" 
    },
    { 
      crop: "Onions", 
      currentPrice: 28, 
      change: 15.3, 
      trend: "up", 
      market: "Nashik",
      forecast: "Volatile" 
    },
  ];

  const insights = [
    {
      title: "Monsoon Impact Alert",
      description: "Heavy rainfall expected in North India may affect wheat harvesting. Consider storage options.",
      type: "warning",
      icon: AlertTriangle,
    },
    {
      title: "Export Demand Rising",
      description: "International demand for basmati rice increasing. Good time for premium variety farmers.",
      type: "success",
      icon: TrendingUp,
    },
    {
      title: "Festival Season Approach",
      description: "Vegetable prices likely to surge during upcoming festival season. Plan accordingly.",
      type: "info",
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Market Analysis</h1>
              <p className="text-primary-foreground/90">Real-time prices, trends & AI insights</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Market Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <p className="text-2xl font-bold text-success">127</p>
              <p className="text-sm text-muted-foreground">Markets Rising</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 bg-destructive/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-2xl font-bold text-destructive">43</p>
              <p className="text-sm text-muted-foreground">Markets Falling</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <DollarSign className="h-5 w-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">₹2.1Cr</p>
              <p className="text-sm text-muted-foreground">Today's Volume</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="h-5 w-5 text-info" />
              </div>
              <p className="text-2xl font-bold text-info">85%</p>
              <p className="text-sm text-muted-foreground">AI Accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Live Prices */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Live Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priceData.map((item) => (
                <div
                  key={item.crop}
                  className="flex items-center justify-between p-4 bg-accent/50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.crop}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{item.market}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-bold">₹{item.currentPrice}</p>
                    <p className="text-xs text-muted-foreground">per quintal</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        item.trend === "up"
                          ? "bg-success/20 text-success"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {item.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(item.change)}%
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge
                      variant={
                        item.forecast === "Rising"
                          ? "default"
                          : item.forecast === "Declining"
                          ? "destructive"
                          : item.forecast === "Volatile"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {item.forecast}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button variant="default" className="flex-1">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Detailed Charts
              </Button>
              <Button variant="outline" className="flex-1">
                <Calendar className="mr-2 h-4 w-4" />
                Price History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              AI Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    insight.type === "warning"
                      ? "border-warning/20 bg-warning/5"
                      : insight.type === "success"
                      ? "border-success/20 bg-success/5"
                      : "border-info/20 bg-info/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        insight.type === "warning"
                          ? "bg-warning/20"
                          : insight.type === "success"
                          ? "bg-success/20"
                          : "bg-info/20"
                      }`}
                    >
                      <insight.icon
                        className={`h-4 w-4 ${
                          insight.type === "warning"
                            ? "text-warning"
                            : insight.type === "success"
                            ? "text-success"
                            : "text-info"
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm">Price Alerts</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <BarChart3 className="h-5 w-5" />
            <span className="text-sm">Export Report</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Set Reminders</span>
          </Button>
        </div>
      </div>
    </div>
  );
}