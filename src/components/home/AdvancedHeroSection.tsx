import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Camera, 
  ArrowRight, 
  Play, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap,
  Leaf,
  Globe,
  Award
} from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

export function AdvancedHeroSection() {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const quickStats = [
    { icon: Users, value: "50K+", label: "Farmers" },
    { icon: Camera, value: "95%", label: "AI Accuracy" },
    { icon: TrendingUp, value: "300%", label: "Growth" },
    { icon: Award, value: "12", label: "Awards" }
  ];

  const features = [
    { icon: Camera, title: "AI Disease Detection", desc: "Instant crop diagnosis" },
    { icon: TrendingUp, title: "Market Intelligence", desc: "Real-time price insights" },
    { icon: Shield, title: "Expert Support", desc: "24/7 agricultural guidance" },
    { icon: Globe, title: "Multi-language", desc: "15+ Indian languages" }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-advanced opacity-95" />
        <div className="absolute inset-0 bg-gradient-tech opacity-30" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-20 h-20 bg-primary/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen px-4 sm:px-6 lg:px-8 py-20">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Announcement Badge */}
            <div className="animate-fade-in">
              <Badge className="bg-gradient-secondary text-foreground border-secondary/30 backdrop-blur-sm px-6 py-3 text-sm font-medium shadow-tech">
                🚀 AI-Powered • Trusted by 50,000+ Farmers • 95% Accuracy
              </Badge>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
                Advanced{" "}
                <span className="bg-gradient-secondary bg-clip-text text-transparent">
                  AI Farming
                </span>{" "}
                Platform
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                Revolutionize your agriculture with cutting-edge AI technology. Get instant crop disease detection, market intelligence, and personalized farming insights in your local language.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate("/diagnose")}
                className="group shadow-floating"
              >
                <Camera className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start AI Diagnosis
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="xl"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0 bg-background border-border">
                  <div className="aspect-video w-full">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/eGzrUnASnU0?si=vBkrUx6mK9i_6KAy" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {quickStats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-primary-foreground/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-lg font-bold text-primary-foreground">{stat.value}</div>
                  <div className="text-xs text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title}
                  className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 shadow-tech hover:shadow-advanced group"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mb-4 bg-gradient-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-primary-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-primary-foreground/70">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trust Indicators */}
            <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 shadow-advanced">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-secondary" />
                  <span className="font-semibold text-primary-foreground">Certified by IARI</span>
                </div>
                <p className="text-sm text-primary-foreground/70">
                  Verified by Indian Agricultural Research Institute
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Advanced Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--background))" />
              <stop offset="50%" stopColor="hsl(var(--muted))" />
              <stop offset="100%" stopColor="hsl(var(--background))" />
            </linearGradient>
          </defs>
          <path 
            d="M0,100 C300,120 400,0 600,20 C800,40 900,100 1200,80 L1200,120 L0,120 Z" 
            fill="url(#waveGradient)" 
          />
        </svg>
      </div>
    </section>
  );
}