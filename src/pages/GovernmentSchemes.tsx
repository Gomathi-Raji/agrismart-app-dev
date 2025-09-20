import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Calendar, 
  DollarSign, 
  Users, 
  FileText,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

export default function GovernmentSchemes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "Subsidies", count: 25, icon: DollarSign },
    { name: "Loans", count: 18, icon: FileText },
    { name: "Insurance", count: 12, icon: Users },
    { name: "Training", count: 15, icon: Users },
  ];

  const schemes = [
    {
      id: 1,
      title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      description: "Direct income support of ₹6,000 per year to small and marginal farmers",
      category: "Subsidies",
      amount: "₹6,000/year",
      eligibility: "Small & marginal farmers with landholding up to 2 hectares",
      deadline: "Ongoing registration",
      status: "active",
      benefits: ["Direct cash transfer", "No paperwork hassle", "Covers all crops"],
      applicationUrl: "https://pmkisan.gov.in/",
      lastUpdated: "15 days ago"
    },
    {
      id: 2,
      title: "Kisan Credit Card (KCC)",
      description: "Easy credit facility for farmers to meet their agricultural expenses",
      category: "Loans",
      amount: "Up to ₹3 Lakhs",
      eligibility: "All farmers owning cultivable land",
      deadline: "Apply anytime",
      status: "active",
      benefits: ["Low interest rates", "Flexible repayment", "Insurance coverage"],
      applicationUrl: "https://www.nabard.org/",
      lastUpdated: "5 days ago"
    },
    {
      id: 3,
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description: "Crop insurance scheme providing financial support to farmers in case of crop loss",
      category: "Insurance",
      amount: "Premium: 2-5%",
      eligibility: "All farmers growing notified crops",
      deadline: "Before sowing season",
      status: "seasonal",
      benefits: ["Weather risk coverage", "Technology adoption", "Quick claim settlement"],
      applicationUrl: "https://pmfby.gov.in/",
      lastUpdated: "10 days ago"
    },
    {
      id: 4,
      title: "Agricultural Marketing Infrastructure (AMI)",
      description: "Development and strengthening of agricultural marketing infrastructure",
      category: "Subsidies",
      amount: "33% subsidy",
      eligibility: "Individual farmers, FPOs, Cooperatives",
      deadline: "March 31, 2024",
      status: "urgent",
      benefits: ["Infrastructure development", "Market linkage", "Value addition"],
      applicationUrl: "https://agricoop.gov.in/",
      lastUpdated: "3 days ago"
    }
  ];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "seasonal": return "warning";
      case "urgent": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return CheckCircle;
      case "seasonal": return Info;
      case "urgent": return AlertTriangle;
      default: return Info;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Government Schemes</h1>
          <p className="text-primary-foreground/90">Find subsidies, loans, and support programs for farmers</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Government schemes content */}
        {/* Search */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search schemes by name, category, or benefits..."
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
                <category.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} schemes</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Schemes Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {selectedCategory ? `${selectedCategory} Schemes` : "All Schemes"}
            </h2>
            <p className="text-muted-foreground">{filteredSchemes.length} schemes found</p>
          </div>

          <div className="space-y-6">
            {filteredSchemes.map((scheme) => {
              const StatusIcon = getStatusIcon(scheme.status);
              return (
                <Card key={scheme.id} className="shadow-elegant hover:shadow-glow transition-all duration-300 animate-fade-in">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{scheme.title}</h3>
                            <Badge variant={getStatusColor(scheme.status) as any} className="flex items-center gap-1">
                              <StatusIcon className="h-3 w-3" />
                              {scheme.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{scheme.description}</p>
                          <Badge variant="secondary" className="mt-2">{scheme.category}</Badge>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{scheme.amount}</p>
                          <p className="text-sm text-muted-foreground">Financial Support</p>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid md:grid-cols-2 gap-4 p-4 bg-accent/30 rounded-lg">
                        <div>
                          <h4 className="font-medium flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-primary" />
                            Eligibility
                          </h4>
                          <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                        </div>
                        <div>
                          <h4 className="font-medium flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            Deadline
                          </h4>
                          <p className="text-sm text-muted-foreground">{scheme.deadline}</p>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-medium mb-2">Key Benefits</h4>
                        <div className="flex flex-wrap gap-2">
                          {scheme.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                        <Button 
                          variant="hero" 
                          className="flex-1"
                          onClick={() => window.open(scheme.applicationUrl, '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Apply Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>

                      {/* Footer */}
                      <div className="text-xs text-muted-foreground">
                        Last updated: {scheme.lastUpdated}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-sm">Download Forms</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">Eligibility Check</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Set Reminders</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}