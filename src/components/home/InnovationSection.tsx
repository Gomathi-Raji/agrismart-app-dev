import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Plane, 
  Cpu, 
  Satellite,
  Thermometer,
  Droplets,
  BarChart3
} from "lucide-react";
import droneSprayingImage from "@/assets/drone-spraying.jpg";
import soilSensorsImage from "@/assets/soil-sensors.jpg";
import aiDetectionImage from "@/assets/ai-detection.jpg";
import satelliteViewImage from "@/assets/satellite-view.jpg";
import smartIrrigationImage from "@/assets/smart-irrigation.jpg";
import marketAnalyticsImage from "@/assets/market-analytics.jpg";

export function InnovationSection() {
  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      navigate(link);
    }
  };

  const innovations = [
    {
      icon: Plane,
      title: "Drone Technology",
      description: "Autonomous UAVs for crop monitoring, spraying, and field analysis",
      image: droneSprayingImage,
      badge: "AI-Powered",
      color: "bg-gradient-primary",
      link: "https://www.india.gov.in/spotlight/namo-drone-didi"
    },
    {
      icon: Thermometer,
      title: "IoT Soil Sensors",  
      description: "Smart sensors monitoring soil health, moisture, and nutrient levels",
      image: soilSensorsImage,
      badge: "Real-time",
      color: "bg-gradient-secondary",
      link: "https://soilhealth.dac.gov.in/home"
    },
    {
      icon: Cpu,
      title: "AI Disease Detection",
      description: "Machine learning algorithms for early crop disease identification",
      image: aiDetectionImage, 
      badge: "95% Accurate",
      color: "bg-gradient-primary",
      link: "/diagnose"
    },
    {
      icon: Satellite,
      title: "Satellite Imaging",
      description: "High-resolution satellite data for large-scale field monitoring",
      image: satelliteViewImage,
      badge: "Global Coverage",
      color: "bg-gradient-secondary",
      link: "/weather"
    },
    {
      icon: Droplets,
      title: "Smart Irrigation",
      description: "Precision water management based on crop needs and weather data",
      image: smartIrrigationImage,
      badge: "Water Efficient", 
      color: "bg-gradient-primary",
      link: "/recommendations"
    },
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Real-time price tracking and demand forecasting for optimal sales",
      image: marketAnalyticsImage,
      badge: "Profit Focused",
      color: "bg-gradient-secondary",
      link: "/market-analysis"
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-60 h-60 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cutting-Edge{" "}
            <span className="text-primary">Agricultural Innovation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our advanced technologies are transforming traditional farming 
            into precision agriculture for maximum yield and sustainability.
          </p>
        </motion.div>

        {/* Innovation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovations.map((innovation, index) => (
            <motion.div
              key={innovation.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full bg-card hover:bg-accent/50 transition-all duration-300 shadow-tech hover:shadow-elegant border-border/50">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${innovation.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <innovation.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <Badge className="bg-secondary/10 text-secondary-foreground border-secondary/20">
                      {innovation.badge}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {innovation.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {innovation.description}
                    </p>
                  </div>

                  {/* Innovation Image */}
                  <div className="mt-4 h-32 bg-gradient-card rounded-lg border border-border/20 overflow-hidden">
                    <img 
                      src={innovation.image} 
                      alt={innovation.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Action Indicator */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <button 
                      onClick={() => handleNavigation(innovation.link)}
                      className="flex items-center text-sm text-primary font-medium group-hover:translate-x-2 transition-transform cursor-pointer hover:text-primary/80 w-full text-left"
                    >
                      Learn More →
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-card px-6 py-3 rounded-full shadow-elegant">
            <Cpu className="h-4 w-4 text-primary" />
            <span>Powered by Advanced AI & Machine Learning</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}