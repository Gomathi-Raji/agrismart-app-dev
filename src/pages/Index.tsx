import { GreetingSection } from "@/components/home/GreetingSection";
import { QuickActionsGrid } from "@/components/home/QuickActionsGrid";
import { AlertsSection } from "@/components/home/AlertsSection";
import { EngagementSection } from "@/components/home/EngagementSection";
import { KnowledgeSection } from "@/components/home/KnowledgeSection";
import { AISuggestionsSection } from "@/components/home/AIsuggestionsSection";
import { FieldIntelligenceMap } from "@/components/cards/FieldIntelligenceMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/30">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-green-500/5 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {/* Greeting + Smart Overview */}
        <div className="animate-fade-in">
          <GreetingSection />
        </div>

        {/* Quick Actions Grid */}
        <div className="animate-fade-in [animation-delay:100ms]">
          <QuickActionsGrid />
        </div>

        {/* Alerts Section */}
        <div className="animate-fade-in [animation-delay:200ms]">
          <AlertsSection />
        </div>

        {/* Field Intelligence Map */}
        <div className="animate-fade-in [animation-delay:300ms] container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto" style={{ height: '500px' }}>
            <FieldIntelligenceMap className="w-full h-full" />
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="animate-fade-in [animation-delay:400ms]">
          <AISuggestionsSection />
        </div>

        {/* Engagement Features */}
        <div className="animate-fade-in [animation-delay:500ms]">
          <EngagementSection />
        </div>

        {/* Knowledge & News */}
        <div className="animate-fade-in [animation-delay:600ms]">
          <KnowledgeSection />
        </div>
      </div>
    </div>
  );
};

export default Index;