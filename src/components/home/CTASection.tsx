import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  MessageCircle, 
  Download, 
  Smartphone,
  Zap,
  Users,
  Award,
  Shield
} from "lucide-react";

export function CTASection() {
  const navigate = useNavigate();

  const benefits = [
    { icon: Zap, text: "Instant AI Analysis" },
    { icon: Users, text: "Community Support" },
    { icon: Award, text: "Proven Results" },
    { icon: Shield, text: "Secure & Private" },
  ];

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-primary/10 rounded-full blur-xl animate-pulse" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Join 50,000+ farmers who have already increased their yields and profits 
            with AgriSmart's AI-powered farming solutions.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center space-y-2 text-primary-foreground/80 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
          
          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-8">
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/user-profile")}
              className="w-full sm:w-auto group"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
          </div>
        </div>

        {/* Trust Indicators */}
        <Card className="bg-card/10 backdrop-blur-sm border-primary-foreground/10">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-foreground mb-2">100% Free</div>
                <p className="text-primary-foreground/70 text-sm">No hidden charges or subscription fees</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-foreground mb-2">Instant Access</div>
                <p className="text-primary-foreground/70 text-sm">Start using AI features immediately</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-foreground mb-2">Expert Support</div>
                <p className="text-primary-foreground/70 text-sm">24/7 agricultural expert assistance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}