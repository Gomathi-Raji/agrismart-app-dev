import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  User, 
  Eye, 
  Heart, 
  Share, 
  BookOpen,
  TrendingUp,
  Filter,
  Clock,
  ArrowRight
} from "lucide-react";
import aiFeaturedImage from "@/assets/ai-agriculture-featured.jpg";
import wheatPricesImage from "@/assets/wheat-prices-article.jpg";
import organicFarmingImage from "@/assets/organic-farming-article.jpg";
import monsoonForecastImage from "@/assets/monsoon-forecast-article.jpg";
import smartIrrigationImage from "@/assets/smart-irrigation-article.jpg";
import solarFarmingImage from "@/assets/solar-farming-article.jpg";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "Crop Management", count: 45, color: "primary" },
    { name: "Market Trends", count: 32, color: "secondary" },
    { name: "Technology", count: 28, color: "success" },
    { name: "Weather Updates", count: 23, color: "warning" },
  ];

  const featuredArticle = {
    id: 1,
    title: "Revolutionary AI Technology Transforms Indian Agriculture",
    excerpt: "Discover how artificial intelligence is helping farmers increase yields by 40% while reducing costs through smart disease detection and precision farming techniques.",
    author: "Dr. Priya Sharma",
    publishDate: "March 15, 2024",
    readTime: "8 min read",
    category: "Technology",
    views: 15420,
    likes: 892,
    image: aiFeaturedImage,
    featured: true
  };

  const articles = [
    {
      id: 2,
      title: "Wheat Prices Surge 15% This Month: What Farmers Need to Know",
      excerpt: "Market analysis reveals key factors driving wheat prices up. Expert insights on when to sell for maximum profits.",
      author: "Rajesh Kumar",
      publishDate: "March 12, 2024",
      readTime: "5 min read",
      category: "Market Trends",
      views: 8950,
      likes: 234,
      image: wheatPricesImage
    },
    {
      id: 3,
      title: "Organic Farming: A Complete Guide to Chemical-Free Agriculture",
      excerpt: "Step-by-step process to transition from conventional to organic farming. Includes certification requirements and expected returns.",
      author: "Sunita Devi",
      publishDate: "March 10, 2024",
      readTime: "12 min read",
      category: "Crop Management",
      views: 12300,
      likes: 567,
      image: organicFarmingImage
    },
    {
      id: 4,
      title: "Monsoon Forecast 2024: Prepare Your Crops for Success",
      excerpt: "IMD predicts normal rainfall this year. Learn how to optimize your cropping pattern based on weather predictions.",
      author: "Dr. Amit Verma",
      publishDate: "March 8, 2024",
      readTime: "6 min read",
      category: "Weather Updates",
      views: 6780,
      likes: 189,
      image: monsoonForecastImage
    },
    {
      id: 5,
      title: "Smart Irrigation Systems: Save Water, Increase Yield",
      excerpt: "Discover IoT-based irrigation solutions that can reduce water consumption by 30% while improving crop productivity.",
      author: "Neha Patel",
      publishDate: "March 5, 2024",
      readTime: "9 min read",
      category: "Technology",
      views: 9840,
      likes: 445,
      image: smartIrrigationImage
    },
    {
      id: 6,
      title: "Government Announces New Subsidy for Solar-Powered Farming",
      excerpt: "50% subsidy available for farmers adopting solar energy solutions. Application process and eligibility criteria explained.",
      author: "Vikram Singh",
      publishDate: "March 3, 2024",
      readTime: "4 min read",
      category: "Technology",
      views: 11200,
      likes: 678,
      image: solarFarmingImage
    }
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Agriculture News & Insights</h1>
          <p className="text-primary-foreground/90">Stay updated with latest farming trends, market news, and expert advice</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Search & Categories */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="shadow-elegant">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles, news, and insights..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-elegant bg-gradient-card">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Weekly Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get farming insights delivered to your inbox
                </p>
                <Button variant="default" className="w-full">
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className={`cursor-pointer transition-all duration-200 hover:shadow-primary ${
                selectedCategory === category.name
                  ? "border-primary shadow-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )
              }
            >
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} articles</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Article */}
        <Card className="shadow-glow border-primary/20 bg-gradient-card">
          <div className="relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="default" className="bg-primary">
                Featured
              </Badge>
            </div>
            <div className="md:flex">
              {/* Image */}
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="md:w-1/2 p-6 md:p-8">
                <Badge variant="secondary" className="mb-3">
                  {featuredArticle.category}
                </Badge>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  {featuredArticle.title}
                </h2>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{featuredArticle.publishDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button variant="hero">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{formatViews(featuredArticle.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{featuredArticle.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Articles Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {selectedCategory ? `${selectedCategory} Articles` : "Latest Articles"}
            </h2>
            <p className="text-muted-foreground">{filteredArticles.length} articles found</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="shadow-elegant hover:shadow-glow transition-all duration-300 animate-fade-in">
                {/* Image */}
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">{article.publishDate}</span>
                    </div>

                    {/* Title & Excerpt */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{article.excerpt}</p>
                    </div>

                    {/* Author & Read Time */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{formatViews(article.views)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{article.likes}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {[
                "Wheat Prices", "Organic Farming", "AI Agriculture", "Monsoon 2024",
                "Solar Farming", "Crop Insurance", "Market Trends", "Government Schemes"
              ].map((topic, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  #{topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm">Submit Article</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Heart className="h-5 w-5" />
                <span className="text-sm">Saved Articles</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Popular Posts</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}