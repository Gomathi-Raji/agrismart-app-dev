import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Cloud, Clock, Leaf, TrendingUp, ChevronRight } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { mockData } from "@/data/mockData";

export function GreetingSection() {
  const { weatherData, loading: weatherLoading } = useWeather();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const nextTask = mockData.tasks[0];
  const bestCrop = mockData.cropHealth.reduce((prev, current) => 
    prev.health > current.health ? prev : current
  );
  const topMarketItem = mockData.marketPrices.reduce((prev, current) => 
    Math.abs(current.change) > Math.abs(prev.change) ? current : prev
  );

  const summaryCards = [
    {
      title: "Weather Today",
      icon: <Cloud className="h-5 w-5 text-blue-500" />,
      content: weatherLoading ? "Loading..." : `${Math.round(weatherData?.current?.temperature_2m || 0)}°C, Clear`,
      subtitle: weatherData?.current?.relative_humidity_2m ? `${Math.round(weatherData.current.relative_humidity_2m)}% humidity` : "Clear skies",
      color: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "Next Task",
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      content: nextTask.title,
      subtitle: `${nextTask.time} • ${nextTask.crop}`,
      color: "bg-orange-50 dark:bg-orange-950/20"
    },
    {
      title: "Crop Health",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      content: `${bestCrop.crop} - ${bestCrop.health}%`,
      subtitle: `${bestCrop.status} • ${bestCrop.lastCheck}`,
      color: "bg-green-50 dark:bg-green-950/20"
    },
    {
      title: "Market Trend",
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
      content: `${topMarketItem.crop} ₹${topMarketItem.currentPrice}`,
      subtitle: `${topMarketItem.change > 0 ? '+' : ''}${topMarketItem.change}% today`,
      color: topMarketItem.change > 0 ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"
    }
  ];

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            🌱 {greeting}, {mockData.farmer.name}!
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockData.farmer.location} • {mockData.farmer.farmSize}
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {mockData.progress.totalPoints} pts
        </Badge>
      </div>

      {/* Swipeable Summary Cards */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {summaryCards.map((card, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3">
                <Card className={`${card.color} border-0 shadow-sm hover:shadow-md transition-shadow`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {card.icon}
                        <span className="text-sm font-medium text-muted-foreground">
                          {card.title}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground leading-tight">
                        {card.content}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {card.subtitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
}