import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check,
  Star,
  Zap,
  Shield,
  Crown,
  Users,
  ArrowRight
} from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Essential Plan",
      price: "Free",
      description: "Perfect for small farmers starting their digital journey",
      icon: Users,
      features: [
        "Basic crop disease detection",
        "Weather forecasts",
        "5 field monitoring spots",
        "Community support",
        "Mobile app access",
        "Basic market prices"
      ],
      limitations: [
        "Limited AI analysis",
        "Standard support"
      ],
      cta: "Get Started Free",
      popular: false,
      color: "border-border"
    },
    {
      name: "Professional Plan", 
      price: "₹999",
      period: "/month",
      description: "Advanced features for serious farmers who want to maximize yields",
      icon: Zap,
      features: [
        "Advanced AI disease detection",
        "Unlimited field monitoring",
        "Real-time soil sensors integration",
        "Drone imagery analysis",
        "Market intelligence & predictions",
        "Automated irrigation scheduling",
        "Government scheme notifications",
        "Priority customer support",
        "Detailed analytics & reports"
      ],
      limitations: [],
      cta: "Start 30-Day Trial",
      popular: true,
      color: "border-primary shadow-primary"
    },
    {
      name: "Custom Plan",
      price: "Custom",
      description: "Tailored solutions for large farms and agricultural enterprises",
      icon: Crown,
      features: [
        "Everything in Professional",
        "Custom AI model training",  
        "Multi-farm management",
        "API access & integrations",
        "Dedicated account manager",
        "On-site installation & training",
        "White-label solutions",
        "24/7 phone support",
        "Custom reporting & dashboards"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      color: "border-secondary"
    }
  ];

  return (
    <section className="py-20 bg-gradient-card relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-60 h-60 border border-primary rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 border border-secondary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
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
            Choose Your{" "}
            <span className="text-primary">Growth Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From small-scale farming to large agricultural enterprises, we have 
            the perfect plan to boost your agricultural productivity.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-primary text-primary-foreground shadow-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card className={`h-full ${plan.color} ${plan.popular ? 'bg-gradient-primary/5' : 'bg-card'} transition-all duration-300 hover:shadow-elegant`}>
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                    <plan.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="py-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground ml-1">{plan.period}</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-primary hover:opacity-90' : ''} shadow-tech`}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {plan.name === "Professional Plan" && (
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      No credit card required • Cancel anytime
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}  
        </div>

        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-feature border-border/50">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Money-Back Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    30-day satisfaction guarantee on all paid plans
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Expert Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Agricultural experts available to help you succeed
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Instant Setup</h3>
                  <p className="text-sm text-muted-foreground">
                    Get started in minutes with our easy onboarding
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}