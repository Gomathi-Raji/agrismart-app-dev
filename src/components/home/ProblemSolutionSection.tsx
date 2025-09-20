import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CloudRain, 
  TrendingDown, 
  Zap,
  Leaf,
  BarChart3,
  Shield
} from "lucide-react";

export function ProblemSolutionSection() {
  const problems = [
    { icon: CloudRain, text: "Unpredictable weather patterns" },
    { icon: TrendingDown, text: "Declining crop yields" },
    { icon: Shield, text: "Disease outbreaks" }
  ];

  const solutions = [
    { icon: Zap, text: "AI-powered crop monitoring" },
    { icon: BarChart3, text: "Real-time market insights" },
    { icon: Leaf, text: "Precision agriculture" }
  ];

  return (
    <section className="py-20 bg-gradient-feature relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-secondary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
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
            Solving Modern{" "}
            <span className="text-primary">Farming Challenges</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional farming faces unprecedented challenges. Our AI-powered platform 
            provides smart solutions for sustainable agriculture.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  The Challenge
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Climate change, resource scarcity, and market volatility are making 
                  traditional farming methods increasingly ineffective.
                </p>
              </div>

              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-4 bg-card rounded-lg shadow-tech"
                  >
                    <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <problem.icon className="h-6 w-6 text-destructive" />
                    </div>
                    <span className="text-foreground font-medium">{problem.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Our Solution
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  AgriSmart combines artificial intelligence, IoT sensors, and market 
                  intelligence to revolutionize farming practices.
                </p>
              </div>

              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-4 bg-card rounded-lg shadow-tech hover:shadow-elegant transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <solution.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-foreground font-medium">{solution.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Button size="lg" className="mt-6 shadow-primary">
                  Learn More About Our Technology
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}