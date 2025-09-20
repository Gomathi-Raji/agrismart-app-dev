import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Satellite,
  Database,
  Cpu,
  Cloud,
  Zap,
  Shield,
  Globe,
  Camera,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export function TechnologySection() {
  const navigate = useNavigate();

  const technologies = [
    {
      icon: Brain,
      title: "Advanced AI Models",
      description: "Deep learning algorithms trained on 1M+ crop images for 95% accurate disease detection",
      features: ["Computer Vision", "Neural Networks", "Pattern Recognition"],
      color: "text-primary"
    },
    {
      icon: Satellite,
      title: "Satellite Integration",
      description: "Real-time satellite data for precision agriculture and crop monitoring across India",
      features: ["NDVI Analysis", "Crop Health Maps", "Yield Prediction"],
      color: "text-secondary"
    },
    {
      icon: Database,
      title: "Big Data Analytics",
      description: "Process millions of data points for market trends, weather patterns, and crop insights",
      features: ["Market Intelligence", "Price Prediction", "Trend Analysis"],
      color: "text-success"
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable cloud platform ensuring 99.9% uptime with instant global accessibility",
      features: ["High Availability", "Auto Scaling", "Global CDN"],
      color: "text-info"
    }
  ];

  const capabilities = [
    { icon: Camera, title: "95% AI Accuracy", desc: "Disease detection precision" },
    { icon: Globe, title: "15+ Languages", desc: "Local language support" },
    { icon: Users, title: "50K+ Farmers", desc: "Active user base" },
    { icon: Award, title: "12 Awards", desc: "AgTech recognition" },
    { icon: Shield, title: "IARI Certified", desc: "Research institute verified" },
    { icon: Zap, title: "Real-time", desc: "Instant results" }
  ];

  return (
    <section className="py-20 bg-gradient-tech relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary rounded-full blur-3xl opacity-20" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 mb-6">
            🚀 Cutting-Edge Technology
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Powered by{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Advanced AI Technology
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our platform leverages the latest in artificial intelligence, satellite imagery, and big data 
            to deliver unprecedented accuracy in crop management and agricultural insights.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <Card 
              key={tech.title}
              className="group bg-gradient-feature border-border/50 shadow-tech hover:shadow-advanced transition-all duration-500 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <tech.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{tech.title}</CardTitle>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {tech.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Platform Capabilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {capabilities.map((capability, index) => (
              <Card 
                key={capability.title}
                className="text-center p-6 bg-card/50 backdrop-blur-sm border-border/30 hover:bg-accent/30 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <capability.icon className="h-6 w-6 text-foreground" />
                </div>
                <div className="font-semibold text-sm mb-1">{capability.title}</div>
                <div className="text-xs text-muted-foreground">{capability.desc}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-primary border-primary/20 shadow-floating">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Experience the Future of Agriculture
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who have already transformed their yields with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate("/diagnose")}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-advanced group"
              >
                <Camera className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Try AI Detection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                View Market Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}