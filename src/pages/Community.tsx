import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Calendar, 
  MapPin, 
  Users, 
  Award,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Camera,
  ThumbsUp,
  ThumbsDown,
  Star,
  Clock,
  BookOpen,
  ShoppingCart,
  AlertCircle
} from "lucide-react";

// Import community images
import communityDiscussion from "@/assets/community-discussion.jpg";
import knowledgeSharing from "@/assets/knowledge-sharing.jpg";
import agricultureWorkshop from "@/assets/agriculture-workshop.jpg";
import communityMarketplace from "@/assets/community-marketplace.jpg";
import farmerAvatar1 from "@/assets/farmer-avatar-1.jpg";
import farmerAvatar2 from "@/assets/farmer-avatar-2.jpg";
import farmerAvatar3 from "@/assets/farmer-avatar-3.jpg";
import farmerAvatar4 from "@/assets/farmer-avatar-4.jpg";
import farmerAvatar5 from "@/assets/farmer-avatar-5.jpg";
import expertAvatar1 from "@/assets/expert-avatar-1.jpg";
import expertAvatar2 from "@/assets/expert-avatar-2.jpg";
import agriExpertBadge from "@/assets/agri-expert-badge.jpg";
import experiencedFarmerBadge from "@/assets/experienced-farmer-badge.jpg";
import topContributorBadge from "@/assets/top-contributor-badge.jpg";
import innovationBadge from "@/assets/innovation-badge.jpg";
import helperBadge from "@/assets/helper-badge.jpg";
import successStoryIrrigation from "@/assets/success-story-irrigation.jpg";
import tomatoDiseaseRecovery from "@/assets/tomato-disease-recovery.jpg";
import neemOilSpray from "@/assets/neem-oil-spray.jpg";
import seedsMarketplace from "@/assets/seeds-marketplace.jpg";
import fertilizersMarketplace from "@/assets/fertilizers-marketplace.jpg";
import equipmentMarketplace from "@/assets/equipment-marketplace.jpg";
import harvestMarketplace from "@/assets/harvest-marketplace.jpg";
import onlineWorkshop from "@/assets/online-workshop.jpg";
import certificationProgram from "@/assets/certification-program.jpg";
import farmersMeetup from "@/assets/farmers-meetup.jpg";
import innovationFair from "@/assets/innovation-fair.jpg";
import qaSession from "@/assets/qa-session.jpg";
import yieldSuccess from "@/assets/yield-success.jpg";

// Mock data for demonstration
const mockPosts = [
  {
    id: 1,
    type: "question",
    title: "My tomato plants have yellow leaves - what could be the problem?",
    content: "I've been growing tomatoes for 3 months now, and recently the leaves are turning yellow from the bottom. The plants are getting enough water. What could be causing this?",
    author: {
      name: "Rajesh Kumar",
      location: "Punjab",
      avatar: farmerAvatar3,
      badge: "Experienced Farmer",
      reputation: 234
    },
    timestamp: "2 hours ago",
    category: "Disease Diagnosis",
    likes: 12,
    replies: 8,
    tags: ["tomatoes", "plant-disease", "yellowing"],
    hasImages: true,
    language: "en",
    postImage: tomatoDiseaseRecovery
  },
  {
    id: 2,
    type: "tip",
    title: "Effective Organic Pest Control Using Neem Oil",
    content: "I've been using neem oil spray for the past 2 years and it's incredibly effective against aphids and whiteflies. Mix 2 tablespoons of neem oil with 1 liter of water and spray in the evening.",
    author: {
      name: "Dr. Priya Sharma",
      location: "Maharashtra",
      avatar: expertAvatar1,
      badge: "Agri Expert",
      reputation: 1250
    },
    timestamp: "1 day ago",
    category: "Pest Control",
    likes: 45,
    replies: 23,
    tags: ["organic", "pest-control", "neem-oil"],
    hasImages: true,
    language: "en",
    postImage: neemOilSpray
  },
  {
    id: 3,
    type: "success-story",
    title: "Increased my crop yield by 40% using smart irrigation",
    content: "Sharing my experience with drip irrigation system. Initial investment was ₹25,000 but saved 60% water and increased yield significantly. Happy to answer questions!",
    author: {
      name: "Krishnan Nair",
      location: "Kerala",
      avatar: farmerAvatar5,
      badge: "Innovation Leader",
      reputation: 578
    },
    timestamp: "3 days ago",
    category: "Success Story",
    likes: 89,
    replies: 34,
    tags: ["irrigation", "water-management", "yield-increase"],
    hasImages: true,
    language: "en",
    postImage: successStoryIrrigation
  },
  {
    id: 4,
    type: "question",
    title: "Best fertilizer for organic vegetable farming?",
    content: "I'm transitioning to organic farming and looking for recommendations on the best organic fertilizers for vegetables. What has worked well for you?",
    author: {
      name: "Sunita Devi",
      location: "Haryana", 
      avatar: farmerAvatar2,
      badge: "New Farmer",
      reputation: 45
    },
    timestamp: "5 hours ago",
    category: "Fertilizers",
    likes: 8,
    replies: 12,
    tags: ["organic", "fertilizers", "vegetables"],
    hasImages: false,
    language: "en"
  },
  {
    id: 5,
    type: "tip",
    title: "Monsoon preparation checklist for farmers",
    content: "Essential steps to prepare your farm for monsoon season. From drainage systems to crop protection, here's what I learned after 15 years of farming.",
    author: {
      name: "Ramesh Patel",
      location: "Gujarat",
      avatar: farmerAvatar4,
      badge: "Weather Expert",
      reputation: 445
    },
    timestamp: "2 days ago",
    category: "Weather",
    likes: 67,
    replies: 28,
    tags: ["monsoon", "preparation", "drainage"],
    hasImages: false,
    language: "en"
  }
];

const mockEvents = [
  {
    id: 1,
    title: "Smart Farming Workshop - AI in Agriculture",
    description: "Learn how to integrate AI tools for crop monitoring and disease detection",
    date: "2024-02-15",
    time: "10:00 AM", 
    location: "Online Webinar",
    organizer: "AgriTech Foundation",
    attendees: 234,
    type: "workshop",
    isRegistered: false,
    image: onlineWorkshop
  },
  {
    id: 2,
    title: "Organic Farming Certification Program",
    description: "3-day certification program for organic farming practices and certification process",
    date: "2024-02-20",
    time: "9:00 AM",
    location: "Bangalore Agricultural Center", 
    organizer: "Organic India",
    attendees: 67,
    type: "certification",
    isRegistered: true,
    image: certificationProgram
  },
  {
    id: 3,
    title: "Regional Farmers Meet - Sustainable Practices",
    description: "Exchange ideas on sustainable farming with local farmers and experts",
    date: "2024-02-25",
    time: "2:00 PM",
    location: "Community Center, Pune",
    organizer: "Farmer's Alliance",
    attendees: 156,
    type: "meetup",
    isRegistered: false,
    image: farmersMeetup
  },
  {
    id: 4,
    title: "Agricultural Innovation Fair 2024",
    description: "Discover latest farming technologies and innovative solutions for modern agriculture",
    date: "2024-03-05",
    time: "10:00 AM",
    location: "Delhi Exhibition Center",
    organizer: "AgriInnovate India",
    attendees: 892,
    type: "exhibition",
    isRegistered: false,
    image: innovationFair
  },
  {
    id: 5,
    title: "Q&A Session with Agricultural Experts",
    description: "Interactive session to get your farming questions answered by industry experts",
    date: "2024-02-28",
    time: "4:00 PM",
    location: "Online Interactive Session",
    organizer: "FarmWise Community",
    attendees: 345,
    type: "interactive",
    isRegistered: true,
    image: qaSession
  }
];

const topContributors = [
  {
    name: "Dr. Priya Sharma",
    location: "Maharashtra",
    avatar: expertAvatar1,
    badge: "Agri Expert",
    reputation: 1250,
    posts: 89,
    solutions: 67
  },
  {
    name: "Krishnan Nair", 
    location: "Kerala",
    avatar: farmerAvatar5,
    badge: "Innovation Leader",
    reputation: 578,
    posts: 45,
    solutions: 34
  },
  {
    name: "Rajesh Kumar",
    location: "Punjab", 
    avatar: farmerAvatar3,
    badge: "Experienced Farmer",
    reputation: 234,
    posts: 23,
    solutions: 18
  },
  {
    name: "Dr. Amit Singh",
    location: "Uttar Pradesh",
    avatar: expertAvatar2,
    badge: "Research Expert",
    reputation: 892,
    posts: 67,
    solutions: 45
  },
  {
    name: "Ramesh Patel",
    location: "Gujarat",
    avatar: farmerAvatar4,
    badge: "Weather Expert", 
    reputation: 445,
    posts: 34,
    solutions: 28
  }
];

const marketplaceCategories = [
  {
    category: "Seeds & Seedlings",
    description: "High-quality seeds for various crops",
    items: 125,
    icon: "🌱",
    image: seedsMarketplace
  },
  {
    category: "Fertilizers",
    description: "Organic and chemical fertilizers", 
    items: 89,
    icon: "🌿",
    image: fertilizersMarketplace
  },
  {
    category: "Equipment & Tools",
    description: "Farming tools and machinery",
    items: 234,
    icon: "🚜",
    image: equipmentMarketplace
  },
  {
    category: "Fresh Harvest",
    description: "Farm-fresh produce for sale",
    items: 456,
    icon: "🥕",
    image: harvestMarketplace
  }
];

export default function Community() {
  const { t, language } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("discussions");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // Update search query when URL params change
  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Filter posts based on search query
  const filteredPosts = mockPosts.filter(post => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const categories = [
    { id: "all", name: language === 'ta' ? "அனைத்தும்" : "All", count: 156 },
    { id: "disease-diagnosis", name: language === 'ta' ? "நோய் கண்டறிதல்" : "Disease Diagnosis", count: 45 },
    { id: "pest-control", name: language === 'ta' ? "பூச்சி கட்டுப்பாடு" : "Pest Control", count: 32 },
    { id: "irrigation", name: language === 'ta' ? "நீர்ப்பாசனம்" : "Irrigation", count: 28 },
    { id: "fertilizers", name: language === 'ta' ? "உரங்கள்" : "Fertilizers", count: 23 },
    { id: "market-prices", name: language === 'ta' ? "சந்தை விலைகள்" : "Market Prices", count: 19 },
    { id: "success-stories", name: language === 'ta' ? "வெற்றிக் கதைகள்" : "Success Stories", count: 15 }
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-primary text-primary-foreground p-6 md:p-8 mb-8">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${communityDiscussion})` }}
        />
        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {language === 'ta' ? 'விவசாயிகள் சமூகம்' : 'Farmers Community'}
          </h1>
          <p className="text-primary-foreground/90 text-lg mb-4">
            {language === 'ta' 
              ? 'அறிவைப் பகிர்ந்துகொள்ளுங்கள், கற்றுக்கொள்ளுங்கள் மற்றும் ஒன்றாக வளருங்கள்' 
              : 'Share knowledge, learn together, and grow as one farming community'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>12,500+ {language === 'ta' ? 'உறுப்பினர்கள்' : 'Members'}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>2,340 {language === 'ta' ? 'விவாதங்கள்' : 'Discussions'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>890 {language === 'ta' ? 'நிபுணர்கள்' : 'Experts'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="discussions" className="text-xs md:text-sm">
              <MessageCircle className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">{language === 'ta' ? 'விவாதங்கள்' : 'Discussions'}</span>
              <span className="sm:hidden">Talk</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="text-xs md:text-sm">
              <BookOpen className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">{language === 'ta' ? 'அறிவு பகிர்வு' : 'Knowledge'}</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="text-xs md:text-sm">
              <Calendar className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">{language === 'ta' ? 'நிகழ்வுகள்' : 'Events'}</span>
              <span className="sm:hidden">Events</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="text-xs md:text-sm">
              <ShoppingCart className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">{language === 'ta' ? 'சந்தை' : 'Marketplace'}</span>
              <span className="sm:hidden">Shop</span>
            </TabsTrigger>
          </TabsList>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={language === 'ta' ? 'விவாதங்களைத் தேடுங்கள்...' : 'Search discussions...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="sm:size-default">
                    <Filter className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">{language === 'ta' ? 'வடிகட்டி' : 'Filter'}</span>
                  </Button>
                  <Button size="sm" className="sm:size-default">
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">{language === 'ta' ? 'புதிய கேள்வி' : 'New Question'}</span>
                    <span className="sm:hidden">Post</span>
                  </Button>
                </div>

                {/* Posts Feed */}
                <div className="space-y-4 sm:space-y-6">
                  {searchQuery && (
                    <div className="text-sm text-muted-foreground">
                      Found {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </div>
                  )}
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        {searchQuery ? "No posts found matching your search." : "No posts available."}
                      </p>
                    </div>
                  ) : (
                    filteredPosts.map((post) => (
                      <Card key={post.id} className="shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 space-y-3 min-w-0">
                              {/* Author Info */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <h4 className="font-medium text-sm sm:text-base truncate">{post.author.name}</h4>
                                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                                    {post.author.badge}
                                  </Badge>
                                </div>
                                <Badge variant="outline" className="text-xs flex-shrink-0">{post.category}</Badge>
                              </div>
                              
                              {/* Location and timestamp - mobile responsive */}
                              <div className="text-xs sm:text-sm text-muted-foreground">
                                {post.author.location} • {post.timestamp}
                              </div>

                              {/* Post Content */}
                              <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight">{post.title}</h3>
                                <p className="text-muted-foreground mb-3 text-sm sm:text-base leading-relaxed">{post.content}</p>
                                
                                {/* Post Image - Mobile Optimized */}
                                {post.postImage && (
                                  <div className="mb-3 rounded-lg overflow-hidden max-w-full">
                                    <img 
                                      src={post.postImage} 
                                      alt={post.title}
                                      className="w-full h-32 sm:h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-200"
                                      loading="lazy"
                                    />
                                  </div>
                                )}
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 sm:gap-4 pt-2 border-t">
                                  <Button variant="ghost" size="sm" className="text-muted-foreground text-xs sm:text-sm">
                                    <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    {post.likes}
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-muted-foreground text-xs sm:text-sm">
                                    <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    {post.replies} <span className="hidden sm:inline">{language === 'ta' ? 'பதில்கள்' : 'Replies'}</span>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-muted-foreground text-xs sm:text-sm">
                                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    <span className="hidden sm:inline">{language === 'ta' ? 'பகிர்' : 'Share'}</span>
                                  </Button>
                                  {post.hasImages && (
                                    <Badge variant="outline" className="text-xs ml-auto">
                                      <Camera className="h-3 w-3 mr-1" />
                                      <span className="hidden sm:inline">{language === 'ta' ? 'படங்கள்' : 'Images'}</span>
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Categories - Mobile Horizontal Scroll */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      {language === 'ta' ? 'வகைகள்' : 'Categories'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* Mobile: Horizontal scroll, Desktop: Vertical list */}
                    <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className="flex-shrink-0 lg:w-full lg:justify-start whitespace-nowrap"
                        >
                          {category.name}
                          <Badge variant="outline" className="ml-2 text-xs">
                            {category.count}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Contributors - Mobile responsive */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      {language === 'ta' ? 'முன்னணி பங்களிப்பாளர்கள்' : 'Top Contributors'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {topContributors.slice(0, 3).map((contributor, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                          <AvatarImage src={contributor.avatar} />
                          <AvatarFallback>{contributor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{contributor.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="truncate">{contributor.location}</span>
                            <Badge variant="outline" className="text-xs">
                              {contributor.reputation}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Knowledge Tab */}
          <TabsContent value="knowledge" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={knowledgeSharing} 
                    alt="Knowledge Sharing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Crop Disease Prevention Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive guide on preventing common crop diseases using organic and chemical methods.
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Disease Prevention</Badge>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={agricultureWorkshop} 
                    alt="Agriculture Workshop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Smart Irrigation Techniques</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn about water-efficient irrigation methods that can increase your crop yield.
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Water Management</Badge>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={yieldSuccess} 
                    alt="Yield Success"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Organic Fertilizer Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete guide to organic fertilizers and their application for different crops.
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Organic Farming</Badge>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockEvents.map((event) => (
                <Card key={event.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    {event.isRegistered && (
                      <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
                        Registered
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline">{event.type}</Badge>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>{event.date}</div>
                        <div>{event.time}</div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={event.isRegistered ? "outline" : "default"}
                    >
                      {event.isRegistered ? "View Details" : "Register Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {marketplaceCategories.map((category, index) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  {category.image && (
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <img 
                        src={category.image} 
                        alt={category.category}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}
                  
                  <CardContent className="p-4 sm:p-6 text-center">
                    {!category.image && (
                      <div className="text-4xl mb-4">{category.icon}</div>
                    )}
                    <h3 className="font-semibold mb-2">{category.category}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    <Badge variant="secondary">
                      {category.items} {language === 'ta' ? 'பொருட்கள்' : 'Items'}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}