import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      question: "How accurate is AgriSmart's AI disease detection?",
      answer: "Our AI disease detection system achieves 95% accuracy through advanced machine learning models trained on millions of crop images. The system is continuously improved with new data and validated by agricultural experts from IARI (Indian Agricultural Research Institute)."
    },
    {
      question: "What crops does AgriSmart support?",
      answer: "AgriSmart supports over 500 crop varieties including major crops like rice, wheat, maize, cotton, sugarcane, vegetables, fruits, and pulses. We're constantly adding support for new crops based on farmer requests and regional requirements."
    },
    {
      question: "Do I need special equipment to use AgriSmart?",
      answer: "Not at all! AgriSmart works with just your smartphone camera for basic disease detection. For advanced features, you can optionally integrate IoT sensors, drones, or weather stations, but they're not required to get started."
    },
    {
      question: "Is AgriSmart available in my local language?",
      answer: "Yes! AgriSmart supports 15+ Indian languages including Hindi, Tamil, Telugu, Marathi, Gujarati, Punjabi, Bengali, Kannada, Malayalam, and more. All features including voice commands and text are available in your preferred language."
    },
    {
      question: "How does the pricing work? Are there any hidden costs?",
      answer: "AgriSmart offers a completely free Essential Plan with basic features. The Professional Plan is ₹999/month with advanced AI features and unlimited monitoring. There are no hidden costs, setup fees, or long-term contracts required."
    },
    {
      question: "Can AgriSmart help me get government subsidies?",
      answer: "Absolutely! AgriSmart integrates with government databases to notify you about applicable schemes, help with documentation, and even assist in online applications for subsidies, crop insurance, and support programs like PM-KISAN."
    },
    {
      question: "What if I have poor internet connectivity in my farm area?",
      answer: "AgriSmart is designed for rural connectivity challenges. The mobile app works offline for basic features like disease detection and crop monitoring. Data syncs automatically when you have internet connection, ensuring you never lose important information."
    },
    {
      question: "How quickly can I see results after using AgriSmart?",
      answer: "You can see immediate results with disease detection and weather forecasts. For yield improvements and optimization, most farmers report significant improvements within 2-3 crop cycles (4-6 months) with proper implementation of AI recommendations."
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-10 w-32 h-32 border border-primary rounded-full animate-pulse" />
        <div className="absolute bottom-40 right-10 w-48 h-48 border border-secondary rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
            <HelpCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions about AgriSmart? We've got answers. Find everything you need 
            to know about our AI-powered farming platform.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-card shadow-elegant border-border/50">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                    <AccordionTrigger className="hover:no-underline text-left py-4">
                      <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-feature border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-bold text-foreground">Still have questions?</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Our agricultural experts are here to help you succeed. Get personalized 
                support and guidance for your specific farming needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="shadow-primary">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="lg">
                  Schedule Demo Call
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>📞 24/7 Support • 🌾 Agricultural Experts • 💬 Multi-language Support</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}