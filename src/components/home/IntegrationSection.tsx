import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Shield,
  Wifi,
  Smartphone,
  Database,
  CloudRain,
  Banknote,
  Truck,
  Users,
  Settings,
  Zap
} from "lucide-react";

export function IntegrationSection() {
  const integrations = [
    {
      id: "government",
      title: "Government Schemes & Subsidies",
      description: "Seamlessly access and apply for agricultural subsidies, crop insurance, and government support programs.",
      icon: Shield,
      features: ["PM-KISAN Direct Benefit", "Crop Insurance Claims", "Subsidy Applications", "Policy Updates"]
    },
    {
      id: "iot",
      title: "IoT Devices & Sensors",
      description: "Connect with leading IoT manufacturers for comprehensive field monitoring and automation.",
      icon: Wifi,
      features: ["Soil Moisture Sensors", "Weather Stations", "UAV Integration", "Smart Irrigation Systems"]
    },
    {
      id: "mobile",
      title: "Mobile & WhatsApp Integration", 
      description: "Get instant updates and control your farm operations through mobile apps and WhatsApp.",
      icon: Smartphone,
      features: ["WhatsApp Alerts", "Mobile Dashboard", "Voice Commands", "Offline Mode"]
    },
    {
      id: "market",
      title: "Marketplace & E-commerce",
      description: "Direct connection to buyers, agricultural marketplaces, and e-commerce platforms.",
      icon: Banknote,
      features: ["Price Discovery", "Direct Sales", "Bulk Orders", "Payment Gateway"]
    },
    {
      id: "logistics",
      title: "Supply Chain & Logistics",
      description: "Streamlined logistics for farm inputs delivery and produce transportation.",
      icon: Truck,
      features: ["Input Delivery", "Harvest Pickup", "Cold Chain", "Transportation Tracking"]
    },
    {
      id: "community",
      title: "Farmer Communities & Support",
      description: "Connect with expert agricultural consultants and farmer communities for guidance.",
      icon: Users,
      features: ["Expert Consultation", "Peer Support", "Knowledge Sharing", "Training Programs"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-feature relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-80 h-80 bg-primary rounded-full blur-3xl animate-pulse" />
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
            Seamless Integration with{" "}
            <span className="text-primary">Your Farming Ecosystem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AgriSmart connects with all the tools and services you already use, 
            creating a unified platform for complete farm management.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Integration List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {integrations.map((integration, index) => (
                <AccordionItem key={integration.id} value={integration.id} className="border-none">
                  <Card className="bg-card hover:bg-accent/30 transition-all duration-300 shadow-tech">
                    <AccordionTrigger className="hover:no-underline p-6">
                      <div className="flex items-center space-x-4 text-left">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <integration.icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-lg">{integration.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{integration.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="ml-16 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          {integration.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <Zap className="h-3 w-3 text-primary" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                          Learn More →
                        </Button>
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Night Drone Spraying Visual */}
            <Card className="bg-gradient-card shadow-advanced border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                    <Settings className="h-10 w-10 text-primary-foreground animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Precision Integration
                    </h3>
                    <p className="text-muted-foreground">
                      Our platform seamlessly connects with over 50+ agricultural 
                      services and IoT devices for complete automation.
                    </p>
                  </div>

                  {/* Connection Indicators */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: Database, label: "Data Sync", status: "Active" },
                      { icon: CloudRain, label: "Weather API", status: "Live" },
                      { icon: Smartphone, label: "Mobile App", status: "Connected" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center p-3 bg-background/50 rounded-lg"
                      >
                        <item.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <div className="text-xs font-medium text-foreground">{item.label}</div>
                        <Badge className="text-xs mt-1 bg-success/10 text-success border-success/20">
                          {item.status}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-sm text-muted-foreground">Integrations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">99.9%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Connection Lines */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full animate-ping opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-secondary rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }}></div>
          </motion.div>
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
            <Shield className="h-4 w-4 text-success" />
            <span>Secure API Integration • 24/7 Support • Enterprise Grade</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}