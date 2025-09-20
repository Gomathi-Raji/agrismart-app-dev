import { FeatureCard } from "@/components/FeatureCard";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  TrendingUp,
  ShoppingCart,
  Leaf,
  Users,
  MessageCircle,
  Zap,
  Cloud,
  Shield,
  Globe
} from "lucide-react";
import diseaseImage from "@/assets/crop-disease-detection.jpg";
import marketplaceImage from "@/assets/marketplace.jpg";

export function FeaturesSection() {
  const navigate = useNavigate();

  const primaryFeatures = [
    {
      title: "AI Crop Disease Detection",
      description: "Upload plant images for instant AI-powered disease identification with 95% accuracy. Get treatment recommendations and preventive measures in your local language.",
      icon: Camera,
      image: diseaseImage,
      action: {
        label: "Start Diagnosis",
        onClick: () => navigate("/diagnose"),
        variant: "hero" as const,
      },
    },
    {
      title: "Smart Marketplace",
      description: "Buy and sell crops, fertilizers, seeds, and farming equipment with AI-powered price insights, quality verification, and secure transactions.",
      icon: ShoppingCart,
      image: marketplaceImage,
      action: {
        label: "Browse Products",
        onClick: () => navigate("/buy"),
        variant: "secondary" as const,
      },
    },
    {
      title: "Market Analysis & Predictions",
      description: "Real-time crop prices, market trends, and AI-driven predictions to help you make informed decisions and maximize your profits.",
      icon: TrendingUp,
      action: {
        label: "View Market Insights",
        onClick: () => navigate("/market-analysis"),
        variant: "default" as const,
      },
    },
  ];

  const secondaryFeatures = [
    {
      title: "Weather Intelligence",
      description: "Hyperlocal weather forecasts, alerts, and farming recommendations based on weather patterns and crop requirements.",
      icon: Cloud,
      action: {
        label: "Check Weather",
        onClick: () => navigate("/weather"),
        variant: "default" as const,
      },
    },
    {
      title: "Crops & Hybrid Varieties",
      description: "Comprehensive database of hybrid varieties with AI recommendations for your region, soil type, and climate conditions.",
      icon: Leaf,
      action: {
        label: "Explore Varieties",
        onClick: () => navigate("/crops-hybrid"),
        variant: "default" as const,
      },
    },
    {
      title: "Government Schemes",
      description: "Stay updated with the latest government agricultural schemes, subsidies, and apply directly through our platform.",
      icon: Shield,
      action: {
        label: "View Schemes",
        onClick: () => navigate("/government-schemes"),
        variant: "default" as const,
      },
    },
    {
      title: "Farming Assistant",
      description: "Get personalized recommendations for fertilizers, irrigation, pest control, and best farming practices using AI.",
      icon: Zap,
      action: {
        label: "Get Recommendations",
        onClick: () => navigate("/support"),
        variant: "default" as const,
      },
    },
    {
      title: "Farmer Community",
      description: "Connect with fellow farmers, share experiences, ask questions, and get expert advice from agricultural specialists.",
      icon: Users,
      action: {
        label: "Join Community",
        onClick: () => navigate("/support"),
        variant: "default" as const,
      },
    },
    {
      title: "Multi-language Support",
      description: "Access all features in 15+ Indian languages including Hindi, Tamil, Telugu, Bengali, and more regional languages.",
      icon: Globe,
      action: {
        label: "Choose Language",
        onClick: () => navigate("/support"),
        variant: "default" as const,
      },
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything You Need for{" "}
            <span className="text-primary">Smart Farming</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From AI-powered disease detection to market insights and community support, 
            our comprehensive platform helps you make informed farming decisions and increase profitability.
          </p>
        </div>
        
        {/* Primary Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Core Features</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {primaryFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                image={feature.image}
                action={feature.action}
                gradient={index === 1}
              />
            ))}
          </div>
        </div>

        {/* Secondary Features */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">Additional Tools & Support</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {secondaryFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                action={feature.action}
                gradient={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}