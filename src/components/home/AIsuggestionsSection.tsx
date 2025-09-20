import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Brain, Lightbulb, ChevronRight, RefreshCw } from "lucide-react";
import { generateAISuggestions } from "@/services/geminiService";
import { mockData } from "@/data/mockData";
import { useWeather } from "@/hooks/useWeather";
import type { GeminiSuggestion } from "@/services/geminiService";

export function AISuggestionsSection() {
  const [suggestions, setSuggestions] = useState<GeminiSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const { weatherData } = useWeather();

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const aiSuggestions = await generateAISuggestions(
        mockData.farmer,
        weatherData,
        mockData.cropHealth,
        mockData.marketPrices
      );
      setSuggestions(aiSuggestions);
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [weatherData]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weather':
        return '🌤️';
      case 'pest':
        return '🐛';
      case 'market':
        return '💰';
      case 'irrigation':
        return '💧';
      case 'fertilizer':
        return '🌿';
      default:
        return '💡';
    }
  };

  return (
    <div className="px-4 py-6">
      <Card className="shadow-elegant bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/20 animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Suggestions
                </span>
                <p className="text-xs text-muted-foreground font-normal mt-1">
                  Personalized farming recommendations powered by Gemini AI
                </p>
              </div>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={fetchSuggestions}
              disabled={loading}
              className="hover:bg-primary/10 hover:scale-105 transition-all duration-200"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">Generating personalized suggestions...</span>
              </div>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="group p-4 rounded-xl bg-gradient-to-br from-background via-background/80 to-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-200">
                      {getCategoryIcon(suggestion.category)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-medium text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                        {suggestion.title}
                      </h3>
                      <div className="flex gap-2">
                        <Badge 
                          variant={getPriorityColor(suggestion.priority) as any}
                          className="text-xs whitespace-nowrap"
                        >
                          {suggestion.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {suggestion.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs bg-gradient-to-r from-muted/50 to-muted/30">
                          {suggestion.category}
                        </Badge>
                      </div>
                      {suggestion.actionable && (
                        <Button size="sm" variant="ghost" className="text-xs h-8 text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-200">
                          Take Action
                          <div className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1">
                            →
                          </div>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 opacity-60" />
              </div>
              <p className="text-sm">No suggestions available at the moment</p>
              <p className="text-xs mt-1">Try refreshing to get new recommendations</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}