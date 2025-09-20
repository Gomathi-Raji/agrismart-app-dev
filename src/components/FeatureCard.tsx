import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "secondary" | "outline" | "hero";
  };
  gradient?: boolean;
}

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  image, 
  action, 
  gradient = false 
}: FeatureCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-xl shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 ${
      gradient ? "bg-gradient-card" : "bg-card"
    }`}>
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative p-6">
        {/* Icon */}
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        
        {/* Text */}
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        
        {/* Action Button */}
        {action && (
          <Button
            onClick={action.onClick}
            variant={action.variant || "default"}
            className="w-full"
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}