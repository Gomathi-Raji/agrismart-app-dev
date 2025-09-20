import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import rajeshKumarAvatar from "@/assets/rajesh-kumar-avatar.jpg";
import priyaSharmaAvatar from "@/assets/priya-sharma-avatar.jpg";
import muruganAvatar from "@/assets/murugan-avatar.jpg";
import fatimaBegumAvatar from "@/assets/fatima-begum-avatar.jpg";
import harpreetSinghAvatar from "@/assets/harpreet-singh-avatar.jpg";
import lakshmiDeviAvatar from "@/assets/lakshmi-devi-avatar.jpg";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Punjab",
      crop: "Wheat & Rice Farmer",
      rating: 5,
      quote: "AgriSmart helped me detect wheat rust disease early and saved 80% of my crop. The AI is incredibly accurate and the treatment suggestions worked perfectly!",
      avatar: rajeshKumarAvatar,
      savings: "₹2,50,000 saved"
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra",
      crop: "Cotton Farmer",
      rating: 5,
      quote: "The marketplace feature is amazing! I sold my cotton at 15% higher prices than local mandis. The price predictions were spot on.",
      avatar: priyaSharmaAvatar,
      earnings: "15% more income"
    },
    {
      name: "Murugan S",
      location: "Tamil Nadu",
      crop: "Tomato & Chilli Farmer",
      rating: 5,
      quote: "Voice assistant in Tamil language is a game-changer. I can get farming advice while working in fields without touching my phone.",
      avatar: muruganAvatar,
      benefit: "Hands-free farming"
    },
    {
      name: "Fatima Begum",
      location: "Karnataka",
      crop: "Mixed Crop Farmer",
      rating: 5,
      quote: "Government scheme notifications helped me get ₹50,000 subsidy for drip irrigation. I wouldn't have known about it otherwise!",
      avatar: fatimaBegumAvatar,
      subsidy: "₹50,000 subsidy"
    },
    {
      name: "Harpreet Singh",
      location: "Haryana",
      crop: "Sugarcane Farmer",
      rating: 5,
      quote: "Weather alerts saved my sugarcane crop from unexpected frost. The hyperlocal forecasts are more accurate than TV weather!",
      avatar: harpreetSinghAvatar,
      yield: "95% yield protected"
    },
    {
      name: "Lakshmi Devi",
      location: "Andhra Pradesh",
      crop: "Rice & Vegetable Farmer",
      rating: 5,
      quote: "The community feature connected me with experienced farmers. Their advice helped me increase my vegetable yield by 40%.",
      avatar: lakshmiDeviAvatar,
      growth: "40% yield increase"
    }
  ];

  return (
    <section className="py-20 bg-gradient-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Farmers Say{" "}
            <span className="text-primary">About AgriSmart</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from farmers across India who have transformed their 
            farming practices and increased their income using our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/30" />
                </div>

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Farmer Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    <div className="text-xs text-primary font-medium">{testimonial.crop}</div>
                  </div>
                </div>

                {/* Impact Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                  ✓ {testimonial.savings || testimonial.earnings || testimonial.benefit || testimonial.subsidy || testimonial.yield || testimonial.growth}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-2">98%</div>
            <div className="text-sm text-muted-foreground">User Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-warning mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-info mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Indian Languages</div>
          </div>
        </div>
      </div>
    </section>
  );
}