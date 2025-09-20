import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Monitor,
  BarChart3,
  Bell,
  Camera,
  MapPin,
  TrendingUp,
  Thermometer,
  Droplets,
  Zap
} from "lucide-react";

export function DashboardPreviewSection() {
  const features = [
    { icon: Camera, label: "AI Disease Detection", status: "Active", color: "text-success" },
    { icon: BarChart3, label: "Yield Analytics", status: "Updated", color: "text-primary" },
    { icon: Bell, label: "Smart Alerts", status: "3 New", color: "text-warning" },
    { icon: MapPin, label: "Field Mapping", status: "Live", color: "text-info" }
  ];

  const metrics = [
    { icon: TrendingUp, value: "32%", label: "Yield Increase", change: "+5.2%" },
    { icon: Thermometer, value: "24°C", label: "Soil Temp", change: "Optimal" },
    { icon: Droplets, value: "68%", label: "Moisture", change: "+2.1%" },
    { icon: Zap, value: "95%", label: "AI Accuracy", change: "Excellent" }
  ];

  return (
    <section className="py-20 bg-gradient-card relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-primary rounded-lg rotate-12 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-secondary rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Farm's Brain —{" "}
            <span className="text-primary">All in One Smart Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get comprehensive insights, real-time monitoring, and AI-powered recommendations 
            all in one intuitive dashboard designed for modern farmers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Dashboard Card */}
            <Card className="bg-card shadow-advanced border-2 border-border/50">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Monitor className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">AgriSmart Dashboard</h3>
                      <p className="text-sm text-muted-foreground">Field Overview</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">
                    Live Data
                  </Badge>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-accent/30 rounded-lg p-4"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <metric.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{metric.label}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                        <span className="text-xs text-success font-medium">{metric.change}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Feature List */}
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <feature.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{feature.label}</span>
                      </div>
                      <Badge className={`text-xs ${feature.color} bg-transparent border-current`}>
                        {feature.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 bg-success text-success-foreground rounded-full p-3 shadow-floating"
            >
              <Bell className="h-4 w-4" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -left-4 bg-warning text-warning-foreground rounded-full p-3 shadow-floating"
            >
              <TrendingUp className="h-4 w-4" />
            </motion.div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Everything You Need to Succeed
              </h3>
              <p className="text-lg text-muted-foreground">
                Our comprehensive dashboard puts the power of modern agriculture 
                at your fingertips with intuitive controls and actionable insights.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Real-time Field Monitoring",
                  description: "Track soil conditions, weather patterns, and crop health with live sensor data."
                },
                {
                  title: "AI-Powered Recommendations", 
                  description: "Get personalized farming advice based on your specific crops and conditions."
                },
                {
                  title: "Market Intelligence",
                  description: "Make informed selling decisions with real-time price tracking and demand forecasting."
                },
                {
                  title: "Automated Alerts",
                  description: "Never miss critical moments with smart notifications for irrigation, diseases, and weather."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-primary pl-6"
                >
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <Button size="lg" className="shadow-primary">
                Try Dashboard Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}