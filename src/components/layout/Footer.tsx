import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Smartphone,
  Users,
  Shield,
  Award
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Disease Detection", path: "/diagnose" },
    { name: "Marketplace", path: "/buy" },
    { name: "Recommendations", path: "/recommendations" },
    { name: "Weather Forecast", path: "/weather" },
    { name: "Government Schemes", path: "/government-schemes" },
    { name: "Blog & News", path: "/blogs" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/support" },
    { name: "Community", path: "/support" },
    { name: "Contact Us", path: "/support" },
    { name: "User Guide", path: "/support" },
    { name: "FAQs", path: "/support" },
    { name: "Report Issue", path: "/support" },
  ];

  const features = [
    { icon: Smartphone, text: "Mobile Friendly" },
    { icon: Users, text: "50,000+ Farmers" },
    { icon: Shield, text: "Secure & Private" },
    { icon: Award, text: "95% AI Accuracy" },
  ];

  return (
    <footer className="bg-gradient-card border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <img 
                src="/lovable-uploads/logo.png" 
                alt="AgriSmart Logo" 
                className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-primary">AgriSmart</span>
                <span className="text-sm text-muted-foreground">Smart Farming Solutions</span>
              </div>
            </Link>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering farmers with AI-powered crop disease detection, 
              market insights, and smart farming solutions for better yields and profits.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={`${link.path}-${index}`}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                   Jawaharlal Nehru Salai, Vadapalani, Chennai, Tamil Nadu 600026
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">support@agrismart.com</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium text-foreground mb-3">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get farming tips, market updates, and new features directly to your inbox.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" className="px-4">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">
              © {currentYear} AgriSmart. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>for farmers in India</span>
          </div>
        </div>
      </div>

      {/* Mobile Padding for Bottom Navigation */}
      <div className="md:hidden h-20"></div>
    </footer>
  );
}