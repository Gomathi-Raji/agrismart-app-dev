import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/forms/ContactForm";
import { 
  MessageCircle, 
  HelpCircle, 
  Phone, 
  Mail, 
  Clock,
  Users,
  BookOpen,
  Video,
  ExternalLink,
  CheckCircle,
  Star
} from "lucide-react";

const faqs = [
  {
    question: "How does the AI crop disease detection work?",
    answer: "Our AI analyzes uploaded images of plants using advanced machine learning algorithms trained on thousands of crop disease images. It can identify common diseases, pests, and nutritional deficiencies with 95% accuracy.",
    category: "AI Features"
  },
  {
    question: "How accurate are the market price predictions?",
    answer: "Our market analysis combines real-time data from multiple APMCs, weather patterns, and historical trends. Price predictions have an average accuracy of 85-90% for the next 7 days.",
    category: "Market Data"
  },
  {
    question: "Can I sell my crops directly through the platform?",
    answer: "Yes! You can list your crops in our marketplace. We connect farmers directly with buyers, eliminating middlemen and ensuring better prices for your produce.",
    category: "Marketplace"
  },
  {
    question: "What regions does the weather forecast cover?",
    answer: "We provide detailed weather forecasts for all agricultural regions in India, with hyper-local data available for major farming districts.",
    category: "Weather"
  },
  {
    question: "Is my personal and farm data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and follow strict data protection protocols. Your data is never shared without your explicit consent.",
    category: "Privacy"
  },
  {
    question: "How do I get started as a new farmer on the platform?",
    answer: "Simply sign up, verify your farmer identity, and complete your farm profile. You'll get immediate access to all features including disease detection, weather forecasts, and market prices.",
    category: "Getting Started"
  }
];

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7 Available",
    action: "Start Chat",
    featured: true
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our experts",
    availability: "Mon-Sat 9AM-6PM",
    action: "Call Now",
    phone: "+91 1800-123-4567"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us detailed questions",
    availability: "Response within 2 hours",
    action: "Send Email",
    email: "support@agrismart.com"
  },
  {
    icon: Video,
    title: "Video Call",
    description: "Screen sharing for technical issues",
    availability: "Mon-Fri 10AM-5PM",
    action: "Schedule Call"
  }
];

const helpResources = [
  {
    icon: BookOpen,
    title: "User Guide",
    description: "Complete guide to using all platform features",
    link: "#"
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video tutorials for farmers",
    link: "#"
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Connect with other farmers and experts",
    link: "#"
  },
  {
    icon: HelpCircle,
    title: "FAQ Center",
    description: "Frequently asked questions and answers",
    link: "#"
  }
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Punjab",
    rating: 5,
    text: "The support team helped me understand the AI diagnosis feature. Very knowledgeable and patient!",
    date: "2 days ago"
  },
  {
    name: "Priya Sharma",
    location: "Maharashtra", 
    rating: 5,
    text: "Quick response time and excellent technical support. They solved my marketplace issue within minutes.",
    date: "1 week ago"
  },
  {
    name: "Krishnan Nair",
    location: "Kerala",
    rating: 4,
    text: "Great customer service. The video call feature really helped with my complex query.",
    date: "2 weeks ago"
  }
];

export default function Support() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Support Center</h1>
          <p className="text-primary-foreground/90">We're here to help you succeed with smart farming</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-12">
        {/* Support Channels */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Get Help Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <Card key={index} className={`shadow-elegant hover:shadow-lg transition-shadow ${channel.featured ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-6 text-center">
                  {channel.featured && (
                    <Badge className="mb-3 bg-primary">Most Popular</Badge>
                  )}
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <channel.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{channel.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-4">
                    <Clock className="h-3 w-3" />
                    <span>{channel.availability}</span>
                  </div>
                  <Button 
                    variant={channel.featured ? "default" : "outline"} 
                    className="w-full"
                    size="sm"
                  >
                    {channel.action}
                  </Button>
                  {channel.phone && (
                    <p className="text-xs text-muted-foreground mt-2">{channel.phone}</p>
                  )}
                  {channel.email && (
                    <p className="text-xs text-muted-foreground mt-2">{channel.email}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - FAQs and Resources */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                        <Badge variant="outline" className="text-xs">{faq.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Help Resources */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Help Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {helpResources.map((resource, index) => (
                  <Card key={index} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                          <resource.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Customer Testimonials */}
            <section>
              <h2 className="text-2xl font-bold mb-6">What Our Users Say</h2>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">{testimonial.date}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Contact Form */}
          <div className="space-y-8">
            <ContactForm />
            
            {/* Support Statistics */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Support Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Response Time</span>
                  <Badge variant="secondary">&lt; 30 minutes</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Customer Satisfaction</span>
                  <Badge variant="default">98.5%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Issues Resolved</span>
                  <Badge variant="secondary">First Contact 94%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Support Languages</span>
                  <Badge variant="outline">Hindi, English</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}