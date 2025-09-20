import { Users, Camera, ShoppingCart, Shield, TrendingUp, Leaf, Globe, Award } from "lucide-react";

export function StatsSection() {
  const stats = [
    { 
      label: "Active Farmers", 
      value: "50,000+", 
      icon: Users,
      description: "Farmers trust AgriSmart",
      color: "text-primary"
    },
    { 
      label: "Diseases Detected", 
      value: "1M+", 
      icon: Camera,
      description: "Accurate disease identifications",
      color: "text-success"
    },
    { 
      label: "Successful Trades", 
      value: "25,000+", 
      icon: ShoppingCart,
      description: "Profitable marketplace transactions",
      color: "text-warning"
    },
    { 
      label: "AI Accuracy", 
      value: "95%", 
      icon: Shield,
      description: "Disease detection accuracy",
      color: "text-info"
    },
    { 
      label: "Crop Varieties", 
      value: "500+", 
      icon: Leaf,
      description: "Supported crop types",
      color: "text-success"
    },
    { 
      label: "Market Growth", 
      value: "300%", 
      icon: TrendingUp,
      description: "Farmer income increase",
      color: "text-primary"
    },
    { 
      label: "Languages", 
      value: "15+", 
      icon: Globe,
      description: "Local language support",
      color: "text-warning"
    },
    { 
      label: "Awards Won", 
      value: "12", 
      icon: Award,
      description: "AgTech innovation awards",
      color: "text-info"
    },
  ];

  return (
    <section className="py-20 bg-gradient-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border border-primary rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-secondary rounded-full" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Farmers{" "}
            <span className="text-primary">Across India</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of farmers who have transformed their farming practices 
            with our AI-powered solutions and increased their yields significantly.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="group text-center p-6 rounded-xl bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <stat.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              
              {/* Value */}
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              
              {/* Description */}
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-card px-6 py-3 rounded-full shadow-elegant">
            <Shield className="h-4 w-4 text-success" />
            <span>Verified by Indian Agricultural Research Institute (IARI)</span>
          </div>
        </div>
      </div>
    </section>
  );
}