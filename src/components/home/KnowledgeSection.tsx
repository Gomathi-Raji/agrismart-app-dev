import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Gift, Clock, ChevronRight } from "lucide-react";
import { mockData } from "@/data/mockData";

export function KnowledgeSection() {
  const { knowledge } = mockData;

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4 text-red-500" />;
      case 'article':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'scheme':
        return <Gift className="h-4 w-4 text-green-500" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Knowledge & News</h2>
        <Button variant="ghost" size="sm">
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-3">
        {knowledge.map((item, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex gap-3">
                {item.type !== 'scheme' && (
                  <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-foreground text-sm leading-tight">
                      {item.title}
                    </h3>
                    {getIcon(item.type)}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {item.type === 'video' && (
                      <>
                        <Clock className="h-3 w-3" />
                        <span>{item.duration}</span>
                      </>
                    )}
                    {item.type === 'article' && (
                      <>
                        <Clock className="h-3 w-3" />
                        <span>{item.readTime} read</span>
                      </>
                    )}
                    {item.type === 'scheme' && (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.amount}
                        </Badge>
                        <span>Deadline: {item.deadline}</span>
                      </div>
                    )}
                  </div>
                  
                  {item.type === 'scheme' && (
                    <Button size="sm" className="mt-2" variant="outline">
                      Learn More
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}