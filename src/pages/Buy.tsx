import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  MapPin, 
  Truck,
  Apple,
  Wheat,
  Zap,
  Minus,
  Plus,
  Heart,
  SortAsc,
  Package,
  Recycle,
  Leaf,
  TreePine
} from "lucide-react";
import marketplaceImage from "@/assets/marketplace.jpg";

const categories = [
  { name: "All", icon: Package, count: 892 },
  { name: "Fruits", icon: Apple, count: 145 },
  { name: "Vegetables", icon: Wheat, count: 230 },
  { name: "Fertilizers", icon: Zap, count: 189 },
  { name: "Seeds", icon: Wheat, count: 156 },
  { name: "Equipment", icon: Package, count: 172 },
  { name: "Crop Residue", icon: Wheat, count: 45, category: "recycle" },
  { name: "Animal Waste", icon: TreePine, count: 32, category: "recycle" },
  { name: "Food Waste", icon: Apple, count: 28, category: "recycle" },
  { name: "Other Biomass", icon: Leaf, count: 67, category: "recycle" },
];

const products = [
  // Fruits
  {
    id: 1,
    name: "Premium Apples",
    category: "Fruits",
    price: 120,
    unit: "kg",
    rating: 4.8,
    seller: "Kashmir Orchards",
    location: "Kashmir",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Fresh red apples from Kashmir valleys",
    discount: 10,
  },
  {
    id: 2,
    name: "Alphonso Mangoes",
    category: "Fruits",
    price: 280,
    unit: "kg",
    rating: 4.9,
    seller: "Ratnagiri Farms",
    location: "Maharashtra",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "King of mangoes - Premium Alphonso variety",
    discount: 0,
  },
  {
    id: 3,
    name: "Fresh Bananas",
    category: "Fruits",
    price: 60,
    unit: "dozen",
    rating: 4.5,
    seller: "Kerala Plantations",
    location: "Kerala",
    image: marketplaceImage,
    inStock: true,
    organic: false,
    description: "Fresh yellow bananas, rich in potassium",
    discount: 5,
  },
  
  // Vegetables
  {
    id: 4,
    name: "Premium Tomatoes",
    category: "Vegetables",
    price: 45,
    unit: "kg",
    rating: 4.7,
    seller: "Green Valley Farm",
    location: "Punjab",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Vine-ripened organic tomatoes",
    discount: 0,
  },
  {
    id: 5,
    name: "Fresh Potatoes",
    category: "Vegetables",
    price: 25,
    unit: "kg",
    rating: 4.4,
    seller: "Punjab Farms",
    location: "Punjab",
    image: marketplaceImage,
    inStock: true,
    organic: false,
    description: "Grade A potatoes perfect for cooking",
    discount: 15,
  },
  {
    id: 6,
    name: "Organic Carrots",
    category: "Vegetables",
    price: 55,
    unit: "kg",
    rating: 4.6,
    seller: "Organic Harvest",
    location: "Haryana",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Sweet and crunchy organic carrots",
    discount: 0,
  },
  
  // Fertilizers
  {
    id: 7,
    name: "NPK Fertilizer 19:19:19",
    category: "Fertilizers",
    price: 850,
    unit: "50kg bag",
    rating: 4.6,
    seller: "AgriCorp Ltd",
    location: "Haryana",
    image: marketplaceImage,
    inStock: true,
    organic: false,
    description: "Balanced NPK fertilizer for all crops",
    discount: 8,
  },
  {
    id: 8,
    name: "Organic Compost",
    category: "Fertilizers",
    price: 450,
    unit: "50kg bag",
    rating: 4.8,
    seller: "EcoFarm Solutions",
    location: "Karnataka",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Rich organic compost made from cow dung",
    discount: 12,
  },
  {
    id: 9,
    name: "Urea Fertilizer",
    category: "Fertilizers",
    price: 650,
    unit: "50kg bag",
    rating: 4.3,
    seller: "Fertilizer Corp",
    location: "Gujarat",
    image: marketplaceImage,
    inStock: false,
    organic: false,
    description: "High nitrogen content urea fertilizer",
    discount: 0,
  },
  
  // Seeds
  {
    id: 10,
    name: "Wheat Seeds (HD-3086)",
    category: "Seeds",
    price: 1200,
    unit: "quintal",
    rating: 4.9,
    seller: "SeedTech Ltd",
    location: "Rajasthan",
    image: marketplaceImage,
    inStock: true,
    organic: false,
    description: "High yielding drought resistant wheat variety",
    discount: 5,
  },
  {
    id: 11,
    name: "Hybrid Corn Seeds",
    category: "Seeds",
    price: 2800,
    unit: "25kg bag",
    rating: 4.7,
    seller: "Pioneer Seeds",
    location: "Maharashtra",
    image: marketplaceImage,
    inStock: true,
    organic: false,
    description: "High yielding hybrid corn seeds",
    discount: 0,
  },
  {
    id: 12,
    name: "Tomato Seeds (Hybrid)",
    category: "Seeds",
    price: 450,
    unit: "100g packet",
    rating: 4.5,
    seller: "VegSeed Co",
    location: "Karnataka",
    image: marketplaceImage,
    inStock: true,
    organic: false,
    description: "Disease resistant hybrid tomato seeds",
    discount: 10,
  },
  
  // Equipment
  {
    id: 13,
    name: "Garden Hose 50ft",
    category: "Equipment",
    price: 1250,
    unit: "piece",
    rating: 4.4,
    seller: "AgriTools",
    location: "Delhi",
    image: marketplaceImage,
    inStock: true,
    organic: false,
    description: "Heavy duty garden hose with spray nozzle",
    discount: 20,
  },
  {
    id: 14,
    name: "Hand Pruning Shears",
    category: "Equipment",
    price: 350,
    unit: "piece",
    rating: 4.6,
    seller: "FarmTools Ltd",
    location: "Punjab",
    image: marketplaceImage,
    inStock: true,
    organic: false,
    description: "Sharp steel pruning shears for garden use",
    discount: 0,
  },
  {
    id: 15,
    name: "Watering Can 10L",
    category: "Equipment",
    price: 450,
    unit: "piece",
    rating: 4.2,
    seller: "Garden Essentials",
    location: "Maharashtra",
    image: marketplaceImage,
    inStock: false,
    organic: false,
    description: "Large capacity plastic watering can",
    discount: 15,
  },
  
  // Recycle & Reuse - Crop Residue
  {
    id: 16,
    name: "Rice Straw Bales",
    category: "Crop Residue",
    price: 25,
    unit: "quintal",
    rating: 4.6,
    seller: "Punjab Rice Mills",
    location: "Punjab",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Clean rice straw bales perfect for biogas production",
    discount: 0,
    recyclable: true,
  },
  {
    id: 17,
    name: "Wheat Stubble",
    category: "Crop Residue",
    price: 20,
    unit: "quintal",
    rating: 4.4,
    seller: "Haryana Agri Co-op",
    location: "Haryana",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Fresh wheat stubble available for biogas companies",
    discount: 5,
    recyclable: true,
  },
  {
    id: 18,
    name: "Corn Husks & Stalks",
    category: "Crop Residue",
    price: 30,
    unit: "quintal",
    rating: 4.7,
    seller: "Maharashtra Corn Farm",
    location: "Maharashtra",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "High cellulose corn residue for efficient biogas",
    discount: 0,
    recyclable: true,
  },
  
  // Animal Waste
  {
    id: 19,
    name: "Dairy Cow Manure",
    category: "Animal Waste",
    price: 15,
    unit: "quintal",
    rating: 4.8,
    seller: "Amul Dairy Farm",
    location: "Gujarat",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Fresh cow dung from 500+ dairy cows, high methane potential",
    discount: 0,
    recyclable: true,
  },
  {
    id: 20,
    name: "Poultry Litter",
    category: "Animal Waste",
    price: 35,
    unit: "quintal",
    rating: 4.5,
    seller: "Venky's Poultry",
    location: "Andhra Pradesh",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Nitrogen-rich poultry waste for biogas and fertilizer",
    discount: 10,
    recyclable: true,
  },
  
  // Food Waste
  {
    id: 21,
    name: "Vegetable Market Waste",
    category: "Food Waste",
    price: 10,
    unit: "quintal",
    rating: 4.3,
    seller: "Mumbai Veg Market",
    location: "Maharashtra",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Daily fresh vegetable waste from wholesale market",
    discount: 0,
    recyclable: true,
  },
  {
    id: 22,
    name: "Fruit Processing Waste",
    category: "Food Waste",
    price: 12,
    unit: "quintal",
    rating: 4.6,
    seller: "Real Fruit Juice Co",
    location: "Punjab",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Fruit peels and pulp waste from juice processing",
    discount: 15,
    recyclable: true,
  },
  
  // Other Biomass
  {
    id: 23,
    name: "Water Hyacinth",
    category: "Other Biomass",
    price: 8,
    unit: "quintal",
    rating: 4.4,
    seller: "Kerala Backwaters Clean",
    location: "Kerala",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "Harvested water hyacinth for biogas production",
    discount: 0,
    recyclable: true,
  },
  {
    id: 24,
    name: "Sugarcane Bagasse",
    category: "Other Biomass",
    price: 18,
    unit: "quintal",
    rating: 4.7,
    seller: "Sugar Mill Cooperative",
    location: "Uttar Pradesh",
    image: marketplaceImage,
    inStock: true,
    organic: true,
    description: "High energy bagasse waste from sugar processing",
    discount: 0,
    recyclable: true,
  },
  {
    id: 25,
    name: "Biogas Plant Starter Kit",
    category: "Other Biomass",
    price: 25000,
    unit: "kit",
    rating: 4.9,
    seller: "GreenTech Solutions",
    location: "Karnataka",
    image: marketplaceImage,
    inStock: true,
    organic: false,
    description: "Complete small-scale biogas plant setup for farms",
    discount: 12,
    recyclable: false,
  },
];

export default function Buy() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("name");
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const addToCart = (productId: number) => {
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      const price = product ? product.price * (1 - product.discount / 100) : 0;
      return total + (price * quantity);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-secondary text-secondary-foreground p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Marketplace</h1>
          <p className="text-secondary-foreground/90">Buy fresh produce, fertilizers, seeds & farming equipment</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Search & Filters */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for crops, fertilizers, seeds, equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* Cart Summary */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShoppingCart className="h-4 w-4" />
                <span>{getTotalCartItems()} items • ₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="space-y-6">
          {/* Regular Marketplace */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Marketplace</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.slice(0, 6).map((category) => (
                <Card
                  key={category.name}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-primary ${
                    selectedCategory === category.name
                      ? "border-primary shadow-primary"
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
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recycle & Reuse Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="h-6 w-6 text-success" />
              <h3 className="text-lg font-semibold">Recycle & Reuse ♻️</h3>
            </div>
            <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground">
                Transform agricultural waste into biogas! Farmers can list their biodegradable waste, 
                and biogas companies can source materials for sustainable energy production.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.slice(6).map((category) => (
                <Card
                  key={category.name}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-success border-success/20 ${
                    selectedCategory === category.name
                      ? "border-success shadow-success bg-success/5"
                      : "hover:border-success/50"
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.name ? null : category.name
                    )
                  }
                >
                  <CardContent className="p-4 text-center">
                    <category.icon className="h-8 w-8 mx-auto mb-2 text-success" />
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {selectedCategory ? `${selectedCategory}` : "All Products"}
            </h2>
            <p className="text-muted-foreground">{filteredProducts.length} products found</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="shadow-elegant hover:shadow-glow transition-all duration-300">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.organic && (
                    <Badge className="absolute top-2 left-2 bg-success text-success-foreground">
                      Organic
                    </Badge>
                  )}
                  {product.recyclable && (
                    <Badge className="absolute top-2 right-2 bg-success/10 text-success border border-success/30">
                      <Recycle className="h-3 w-3 mr-1" />
                      Recyclable
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                  {/* Product Info */}
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWishlist(product.id)}
                        className="p-1"
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            wishlist.includes(product.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                  </div>

                  {/* Price & Rating */}
                  <div className="flex justify-between items-center">
                    <div>
                      {product.discount > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-lg line-through text-muted-foreground">₹{product.price}</span>
                          <Badge variant="destructive" className="text-xs">-{product.discount}%</Badge>
                        </div>
                      )}
                      <span className="text-2xl font-bold text-primary">
                        ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">/{product.unit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{product.seller}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{product.location}</span>
                      <Truck className="h-3 w-3 ml-2" />
                      <span>Free delivery</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    {cart[product.id] ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(product.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium w-8 text-center">{cart[product.id]}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addToCart(product.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="text-sm font-medium">
                          ₹{((product.price * (1 - product.discount / 100)) * cart[product.id]).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <Button
                        variant={product.inStock ? "default" : "outline"}
                        disabled={!product.inStock}
                        onClick={() => product.inStock && addToCart(product.id)}
                        className="w-full"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Notify Me"}
                      </Button>
                    )}
                  </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <Truck className="h-4 w-4 mr-2" />
                Track Orders
              </Button>
              <Button variant="outline" className="justify-start">
                <Star className="h-4 w-4 mr-2" />
                My Wishlist
              </Button>
              <Button variant="outline" className="justify-start">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}