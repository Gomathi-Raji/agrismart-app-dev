import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState } from "react";

interface RevenueChartProps {
  userType?: "farmer" | "seller" | "admin";
}

export function RevenueChart({ userType = "farmer" }: RevenueChartProps) {
  const [timeframe, setTimeframe] = useState("7days");
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const getFarmerData = () => ({
    title: "Farm Income",
    data: [
      { name: 'Mon', value: 1200, previous: 1000 },
      { name: 'Tue', value: 1800, previous: 1200 },
      { name: 'Wed', value: 2200, previous: 1800 },
      { name: 'Thu', value: 1900, previous: 2000 },
      { name: 'Fri', value: 2800, previous: 2200 },
      { name: 'Sat', value: 3200, previous: 2800 },
      { name: 'Sun', value: 2900, previous: 3000 }
    ],
    color: "#10b981",
    description: "Weekly crop sales revenue"
  });

  const getSellerData = () => ({
    title: "Sales Revenue",
    data: [
      { name: 'Mon', value: 15000, previous: 12000 },
      { name: 'Tue', value: 18000, previous: 15000 },
      { name: 'Wed', value: 22000, previous: 18000 },
      { name: 'Thu', value: 19000, previous: 20000 },
      { name: 'Fri', value: 28000, previous: 22000 },
      { name: 'Sat', value: 32000, previous: 28000 },
      { name: 'Sun', value: 29000, previous: 30000 }
    ],
    color: "#3b82f6",
    description: "Weekly marketplace sales"
  });

  const getAdminData = () => ({
    title: "Platform Revenue",
    data: [
      { name: 'Mon', value: 45000, previous: 40000 },
      { name: 'Tue', value: 52000, previous: 45000 },
      { name: 'Wed', value: 48000, previous: 50000 },
      { name: 'Thu', value: 61000, previous: 48000 },
      { name: 'Fri', value: 55000, previous: 58000 },
      { name: 'Sat', value: 67000, previous: 55000 },
      { name: 'Sun', value: 72000, previous: 67000 }
    ],
    color: "#8b5cf6",
    description: "Weekly platform commission"
  });

  const getMonthlyData = () => [
    { name: 'Jan', value: 45000, previous: 40000 },
    { name: 'Feb', value: 52000, previous: 45000 },
    { name: 'Mar', value: 48000, previous: 50000 },
    { name: 'Apr', value: 61000, previous: 48000 },
    { name: 'May', value: 55000, previous: 58000 },
    { name: 'Jun', value: 67000, previous: 55000 }
  ];

  const getData = () => {
    switch (userType) {
      case "seller":
        return getSellerData();
      case "admin":
        return getAdminData();
      default:
        return getFarmerData();
    }
  };

  const currentData = getData();
  const displayData = timeframe === "6months" ? getMonthlyData() : currentData.data;

  const totalRevenue = displayData.reduce((sum, item) => sum + item.value, 0);
  const previousTotal = displayData.reduce((sum, item) => sum + item.previous, 0);
  const growth = ((totalRevenue - previousTotal) / previousTotal * 100).toFixed(1);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            Revenue: ₹{payload[0].value.toLocaleString()}
          </p>
          {payload[1] && (
            <p className="text-muted-foreground">
              Previous: ₹{payload[1].value.toLocaleString()}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            {currentData.title}
          </CardTitle>
          <div className="flex gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
              </SelectContent>
            </Select>
            <Select value={chartType} onValueChange={(value: "line" | "bar") => setChartType(value)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="font-medium">₹{totalRevenue.toLocaleString()}</span>
            <span className="text-success">+{growth}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{currentData.description}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={currentData.color}
                  strokeWidth={2}
                  dot={{ fill: currentData.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: currentData.color, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            ) : (
              <BarChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill={currentData.color} radius={[4, 4, 0, 0]} />
                <Bar dataKey="previous" fill="hsl(var(--muted-foreground))" opacity={0.3} radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}