import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Sparkles, Leaf, Apple, Carrot, Thermometer, Droplets, Map } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';
import { toast } from '@/hooks/use-toast';
import { LocationMapSelector } from '@/components/LocationMapSelector';

interface CropRecommendation {
  category: 'crop' | 'vegetable' | 'fruit';
  name: string;
  reason: string;
  tips: string;
  estimatedYield?: string;
  icon: string;
}

interface RecommendationResponse {
  location: string;
  crops: CropRecommendation[];
  vegetables: CropRecommendation[];
  fruits: CropRecommendation[];
  generalTips: string[];
  nextSteps: string[];
}

export default function Recommendations() {
  const [location, setLocation] = useState('');
  const [soilType, setSoilType] = useState('');
  const [landSize, setLandSize] = useState('');
  const [waterSource, setWaterSource] = useState('');
  const [previousCrops, setPreviousCrops] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [farmingExperience, setFarmingExperience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [geminiApiKey] = useState('AIzaSyBmlIUNvfTAacQ3K_wb7RDMwKF8Fo2XiaE'); // User-provided API key
  const { weatherData } = useWeather();
  const [showMapSelector, setShowMapSelector] = useState(false);

  const handleUseCurrentLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            setLocation(address);
            toast({
              title: "Location detected",
              description: `Using current location: ${address}`,
            });
          },
          (error) => {
            console.error('Geolocation error:', error);
            toast({
              title: "Location error",
              description: "Unable to detect location. Please enter manually.",
              variant: "destructive",
            });
          }
        );
      } else {
        toast({
          title: "Location not supported",
          description: "Geolocation is not supported by this browser.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Location detection error:', error);
      toast({
        title: "Location error",
        description: "Unable to detect current location. Please enter manually.",
        variant: "destructive",
      });
    }
  };

  const generateRecommendations = async () => {
    console.log('generateRecommendations called with location:', location);
    
    if (!location.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a location or use current location",
        variant: "destructive",
      });
      return;
    }

    if (!geminiApiKey) {
      toast({
        title: "API key missing",
        description: "Gemini API key is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Fetch weather for the location if not current
      const weatherToUse = weatherData || await getWeatherForLocation(location);
      
      const prompt = generateGeminiPrompt(location, weatherToUse, soilType);
      
      console.log('Attempting to fetch from Gemini API...');
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`API Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      console.log('Gemini API Response:', data);
      console.log('AI Response Text:', aiResponse);
      
      if (!aiResponse) {
        throw new Error('No valid response from Gemini API');
      }
      
      // Parse AI response and structure it
      const parsed = parseAIResponse(aiResponse, location);
      setRecommendations(parsed);

      toast({
        title: "Recommendations generated!",
        description: "AI has analyzed your location and weather data",
      });

    } catch (error) {
      console.error('Error generating recommendations:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: "Error",
        description: `Failed to generate recommendations: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateGeminiPrompt = (loc: string, weather: any, soil: string) => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const season = getCurrentSeason();
    
    return `You are an agricultural expert AI. Based on the following details, recommend the best crops, vegetables, and fruits for farming in this location right now.

Location: ${loc}
Current Month: ${currentMonth}
Season: ${season}
${soil ? `Soil Type: ${soil}` : 'Soil Type: Standard regional soil (assumed)'}

Weather Data:
${weather ? `
- Temperature: ${weather.current?.temperature_2m}°C
- Humidity: ${weather.current?.relative_humidity_2m}%
- Pressure: ${weather.current?.pressure_msl}hPa
- Wind Speed: ${weather.current?.wind_speed_10m}km/h
- Weather Condition: ${weather.current?.weather_code}
` : 'Weather data not available - use general regional climate knowledge'}

Please provide a structured response in this EXACT format:

CROPS:
1. Rice - High yield potential in tropical climate - Plant with proper water management - Estimated yield: 4-6 tons/hectare
2. Wheat - Suitable for winter season - Use disease-resistant varieties - Estimated yield: 3-4 tons/hectare  
3. Corn - Good market demand - Ensure adequate fertilization - Estimated yield: 5-7 tons/hectare

VEGETABLES:
1. Tomato - High market value - Protect from pests using IPM - Estimated yield: 40-50 tons/hectare
2. Okra - Heat tolerant variety - Regular watering needed - Estimated yield: 8-10 tons/hectare
3. Eggplant - Good profit margins - Use organic compost - Estimated yield: 25-30 tons/hectare

FRUITS:
1. Mango - Long-term investment - Requires 3-4 years to fruit - Estimated yield: 100-150 kg/tree
2. Banana - Quick returns possible - Ensure proper drainage - Estimated yield: 40-50 kg/plant
3. Papaya - Year-round production - Protect from strong winds - Estimated yield: 30-40 kg/plant

GENERAL_TIPS:
- Test soil pH before planting (optimal 6.0-7.0)
- Use drip irrigation for water efficiency
- Apply organic fertilizers regularly for soil health
- Monitor weather forecasts for pest management
- Practice crop rotation to prevent soil depletion

NEXT_STEPS:
1. Conduct soil testing for pH and nutrient levels
2. Arrange quality seeds/seedlings from certified dealers
3. Set up irrigation infrastructure
4. Plan planting schedule based on local weather patterns
5. Prepare pest and disease management strategy

Make sure to follow this exact structure and format for proper parsing.`;
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter';
  };

  const getWeatherForLocation = async (loc: string) => {
    try {
      // For now, return null as weather integration would require additional setup
      // This prevents errors when weather data isn't available
      console.log('Weather data requested for:', loc);
      return null;
    } catch (error) {
      console.error('Weather fetch error:', error);
      return null;
    }
  };

  const parseAIResponse = (response: string, loc: string): RecommendationResponse => {
    try {
      console.log('Raw AI Response:', response);
      
      // Split by main sections
      const cropsSection = response.match(/CROPS?:(.*?)(?=VEGETABLES?:|$)/is)?.[1] || '';
      const vegetablesSection = response.match(/VEGETABLES?:(.*?)(?=FRUITS?:|$)/is)?.[1] || '';
      const fruitsSection = response.match(/FRUITS?:(.*?)(?=GENERAL_TIPS|$)/is)?.[1] || '';
      const generalTipsSection = response.match(/GENERAL_TIPS:(.*?)(?=NEXT_STEPS|$)/is)?.[1] || '';
      const nextStepsSection = response.match(/NEXT_STEPS:(.*?)$/is)?.[1] || '';

      // Parse each category
      const parseItems = (text: string, category: 'crop' | 'vegetable' | 'fruit') => {
        const lines = text.split('\n').filter(line => line.trim() && /^\d+\./.test(line.trim()));
        return lines.slice(0, 3).map((line, index) => {
          const match = line.match(/^\d+\.\s*([^-]+)\s*-\s*([^-]+)\s*-\s*([^-]+)(?:\s*-\s*(.+))?/);
          
          if (match) {
            const [, name, reason, tips, yield_info] = match;
            const icons = {
              crop: ['🌾', '🌽', '🍚'][index] || '🌱',
              vegetable: ['🍅', '🥒', '🍆'][index] || '🥬', 
              fruit: ['🥭', '🍌', '🪴'][index] || '🍎'
            };
            
            return {
              category,
              name: name.trim(),
              reason: reason.trim(),
              tips: tips.trim(),
              estimatedYield: yield_info?.trim(),
              icon: icons[category]
            };
          }
          
          // Fallback parsing
          const parts = line.replace(/^\d+\.\s*/, '').split('-').map(p => p.trim());
          const icons = {
            crop: ['🌾', '🌽', '🍚'][index] || '🌱',
            vegetable: ['🍅', '🥒', '🍆'][index] || '🥬', 
            fruit: ['🥭', '🍌', '🪴'][index] || '🍎'
          };
          
          return {
            category,
            name: parts[0] || `Item ${index + 1}`,
            reason: parts[1] || 'Suitable for your location and climate',
            tips: parts[2] || 'Follow standard farming practices',
            estimatedYield: parts[3] || undefined,
            icon: icons[category]
          };
        });
      };

      // Parse general tips and next steps
      const parseListItems = (text: string) => {
        return text.split('\n')
          .filter(line => line.trim() && (line.includes('-') || /^\d+\./.test(line.trim())))
          .map(line => line.replace(/^[-\d+\.]\s*/, '').trim())
          .filter(item => item.length > 0)
          .slice(0, 6);
      };

      const result = {
        location: loc,
        crops: parseItems(cropsSection, 'crop'),
        vegetables: parseItems(vegetablesSection, 'vegetable'),
        fruits: parseItems(fruitsSection, 'fruit'),
        generalTips: parseListItems(generalTipsSection),
        nextSteps: parseListItems(nextStepsSection)
      };

      console.log('Parsed result:', result);
      return result;

    } catch (error) {
      console.error('Error parsing AI response:', error);
      // Enhanced fallback with better data
      return {
        location: loc,
        crops: [
          { category: 'crop', name: 'Rice', reason: 'High yield potential in tropical climate', tips: 'Use proper water management and quality seeds', estimatedYield: '4-6 tons/hectare', icon: '🌾' },
          { category: 'crop', name: 'Wheat', reason: 'Suitable for current season', tips: 'Plant disease-resistant varieties', estimatedYield: '3-4 tons/hectare', icon: '🌾' },
          { category: 'crop', name: 'Maize', reason: 'Good market demand and adaptability', tips: 'Ensure adequate fertilization', estimatedYield: '5-7 tons/hectare', icon: '🌽' },
        ],
        vegetables: [
          { category: 'vegetable', name: 'Tomato', reason: 'High market value and demand', tips: 'Protect from pests using IPM', estimatedYield: '40-50 tons/hectare', icon: '🍅' },
          { category: 'vegetable', name: 'Okra', reason: 'Heat tolerant and hardy', tips: 'Regular watering and mulching', estimatedYield: '8-10 tons/hectare', icon: '🥒' },
          { category: 'vegetable', name: 'Eggplant', reason: 'Good profit margins', tips: 'Use organic compost and proper spacing', estimatedYield: '25-30 tons/hectare', icon: '🍆' },
        ],
        fruits: [
          { category: 'fruit', name: 'Mango', reason: 'Long-term profitable investment', tips: 'Choose suitable varieties and proper spacing', estimatedYield: '100-150 kg/tree', icon: '🥭' },
          { category: 'fruit', name: 'Banana', reason: 'Quick returns and continuous harvest', tips: 'Ensure proper drainage and nutrition', estimatedYield: '40-50 kg/plant', icon: '🍌' },
          { category: 'fruit', name: 'Papaya', reason: 'Year-round production potential', tips: 'Protect from strong winds', estimatedYield: '30-40 kg/plant', icon: '🪴' },
        ],
        generalTips: [
          'Test soil pH before planting (optimal 6.0-7.0)',
          'Use drip irrigation for water efficiency',
          'Apply organic fertilizers regularly for soil health',
          'Monitor weather forecasts for planning',
          'Practice crop rotation to prevent soil depletion',
          'Use integrated pest management (IPM) strategies'
        ],
        nextSteps: [
          'Conduct soil testing for pH and nutrient levels',
          'Arrange quality seeds/seedlings from certified dealers',
          'Set up irrigation infrastructure',
          'Plan planting schedule based on weather',
          'Prepare pest and disease management strategy',
          'Connect with local agricultural extension services'
        ]
      };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crop': return <Leaf className="h-4 w-4" />;
      case 'vegetable': return <Carrot className="h-4 w-4" />;
      case 'fruit': return <Apple className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Smart Crop Recommendations
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get AI-powered crop, vegetable, and fruit recommendations based on your location, 
          weather conditions, and soil type.
        </p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Location & Soil Details</span>
          </CardTitle>
          <CardDescription>
            Enter your location and soil information to get personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex space-x-2">
                <Input
                  id="location"
                  placeholder="Enter city, village, or address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleUseCurrentLocation}
                  title="Use current location"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowMapSelector(true)}
                  title="Select location on map"
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="soil">Current Soil Condition</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger>
                  <SelectValue placeholder="What type of soil do you have?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black-cotton">Black Cotton Soil</SelectItem>
                  <SelectItem value="red">Red Soil</SelectItem>
                  <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                  <SelectItem value="sandy-loam">Sandy Loam</SelectItem>
                  <SelectItem value="clay-loam">Clay Loam</SelectItem>
                  <SelectItem value="laterite">Laterite Soil</SelectItem>
                  <SelectItem value="saline">Saline Soil</SelectItem>
                  <SelectItem value="forest">Forest Soil</SelectItem>
                  <SelectItem value="arid">Arid Soil</SelectItem>
                  <SelectItem value="mixed">Mixed Soil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="landSize">Farm Area</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="landSize"
                  placeholder="Enter area size"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
                />
                <Select defaultValue="acres">
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acres">Acres</SelectItem>
                    <SelectItem value="hectares">Hectares</SelectItem>
                    <SelectItem value="bigha">Bigha</SelectItem>
                    <SelectItem value="gunta">Gunta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="waterSource">Available Water Sources</Label>
              <Select value={waterSource} onValueChange={setWaterSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your water source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rainfed">Rainfed Only</SelectItem>
                  <SelectItem value="bore-well">Bore Well</SelectItem>
                  <SelectItem value="open-well">Open Well</SelectItem>
                  <SelectItem value="canal-seasonal">Canal (Seasonal)</SelectItem>
                  <SelectItem value="canal-perennial">Canal (Perennial)</SelectItem>
                  <SelectItem value="river-seasonal">River (Seasonal)</SelectItem>
                  <SelectItem value="river-perennial">River (Perennial)</SelectItem>
                  <SelectItem value="tank">Farm Pond/Tank</SelectItem>
                  <SelectItem value="drip">Drip Irrigation</SelectItem>
                  <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                  <SelectItem value="multiple">Multiple Sources</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousCrops">Previous Season's Crops</Label>
              <Select value={previousCrops} onValueChange={setPreviousCrops}>
                <SelectTrigger>
                  <SelectValue placeholder="What did you grow last season?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Paddy/Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                  <SelectItem value="maize">Maize/Corn</SelectItem>
                  <SelectItem value="pulses">Pulses</SelectItem>
                  <SelectItem value="oilseeds">Oilseeds</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="spices">Spices</SelectItem>
                  <SelectItem value="fallow">Fallow Land</SelectItem>
                  <SelectItem value="multiple">Multiple Crops</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budgetRange">Investment Capacity (per acre)</Label>
              <Select value={budgetRange} onValueChange={setBudgetRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-low">Less than ₹25,000</SelectItem>
                  <SelectItem value="low">₹25,000 - ₹50,000</SelectItem>
                  <SelectItem value="medium">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="high">₹1,00,000 - ₹2,00,000</SelectItem>
                  <SelectItem value="very-high">More than ₹2,00,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmingExperience">Your Farming Background</Label>
              <Select value={farmingExperience} onValueChange={setFarmingExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Tell us about your experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New to Farming</SelectItem>
                  <SelectItem value="beginner">1-2 Years Experience</SelectItem>
                  <SelectItem value="intermediate">3-5 Years Experience</SelectItem>
                  <SelectItem value="experienced">6-10 Years Experience</SelectItem>
                  <SelectItem value="expert">10+ Years Experience</SelectItem>
                  <SelectItem value="traditional">Traditional Farming Family</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="irrigationSystem">Irrigation System</Label>
              <Select defaultValue="traditional">
                <SelectTrigger>
                  <SelectValue placeholder="Select irrigation method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traditional">Traditional Flood</SelectItem>
                  <SelectItem value="drip">Drip Irrigation</SelectItem>
                  <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                  <SelectItem value="subsurface">Subsurface Irrigation</SelectItem>
                  <SelectItem value="micro">Micro Irrigation</SelectItem>
                  <SelectItem value="none">No Irrigation System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="machinery">Available Farm Machinery</Label>
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue placeholder="Select available equipment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tractor">Tractor</SelectItem>
                  <SelectItem value="harvester">Harvester</SelectItem>
                  <SelectItem value="basic">Basic Tools Only</SelectItem>
                  <SelectItem value="advanced">Advanced Machinery</SelectItem>
                  <SelectItem value="rental">Access to Rental Equipment</SelectItem>
                  <SelectItem value="none">No Machinery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="laborAvailability">Labor Availability</Label>
              <Select defaultValue="family">
                <SelectTrigger>
                  <SelectValue placeholder="Select labor situation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Family Labor Only</SelectItem>
                  <SelectItem value="seasonal">Seasonal Workers Available</SelectItem>
                  <SelectItem value="full-time">Full-time Workers Available</SelectItem>
                  <SelectItem value="limited">Limited Labor Available</SelectItem>
                  <SelectItem value="cooperative">Cooperative Farming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketAccess">Market Access</Label>
              <Select defaultValue="local">
                <SelectTrigger>
                  <SelectValue placeholder="Select market accessibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local Market (within 10 km)</SelectItem>
                  <SelectItem value="regional">Regional Market (10-30 km)</SelectItem>
                  <SelectItem value="wholesale">Wholesale Market Access</SelectItem>
                  <SelectItem value="contract">Contract Farming</SelectItem>
                  <SelectItem value="export">Export Market Access</SelectItem>
                  <SelectItem value="limited">Limited Market Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Weather Info Display */}
          {weatherData && (
            <div className="p-4 bg-accent/50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-primary" />
                Current Weather Conditions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  <span>{Math.round(weatherData.current.temperature_2m)}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  <span>{Math.round(weatherData.current.relative_humidity_2m)}% Humidity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💨</span>
                  <span>{Math.round(weatherData.current.wind_speed_10m)} km/h Wind</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌡️</span>
                  <span>Soil: {Math.round(weatherData.hourly.soil_temperature_0cm[0])}°C</span>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={generateRecommendations} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Recommendations...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get Smart Recommendations
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations Display */}
      {recommendations && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                🌱 Smart Recommendations for {recommendations.location}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Crops */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span>Recommended Crops</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.crops.map((item, index) => (
                  <Card key={index} className="border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <span className="text-2xl">{item.icon}</span>
                          <span>{item.name}</span>
                        </CardTitle>
                        <Badge variant="outline">{getCategoryIcon('crop')}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{item.reason}</p>
                      <p className="text-sm mb-2"><strong>Tips:</strong> {item.tips}</p>
                      {item.estimatedYield && (
                        <p className="text-sm text-primary font-medium">
                          <strong>Est. Yield:</strong> {item.estimatedYield}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vegetables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Carrot className="h-5 w-5 text-secondary" />
                <span>Recommended Vegetables</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.vegetables.map((item, index) => (
                  <Card key={index} className="border-secondary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <span className="text-2xl">{item.icon}</span>
                          <span>{item.name}</span>
                        </CardTitle>
                        <Badge variant="outline">{getCategoryIcon('vegetable')}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{item.reason}</p>
                      <p className="text-sm mb-2"><strong>Tips:</strong> {item.tips}</p>
                      {item.estimatedYield && (
                        <p className="text-sm text-secondary font-medium">
                          <strong>Est. Yield:</strong> {item.estimatedYield}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fruits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Apple className="h-5 w-5 text-info" />
                <span>Recommended Fruits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.fruits.map((item, index) => (
                  <Card key={index} className="border-info/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <span className="text-2xl">{item.icon}</span>
                          <span>{item.name}</span>
                        </CardTitle>
                        <Badge variant="outline">{getCategoryIcon('fruit')}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{item.reason}</p>
                      <p className="text-sm mb-2"><strong>Tips:</strong> {item.tips}</p>
                      {item.estimatedYield && (
                        <p className="text-sm text-info font-medium">
                          <strong>Est. Yield:</strong> {item.estimatedYield}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* General Tips & Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>💡 General Farming Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.generalTips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>➡️ Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Location Map Selector Modal */}
      <LocationMapSelector
        isVisible={showMapSelector}
        onClose={() => setShowMapSelector(false)}
        onLocationSelect={(selectedLocation) => {
          setLocation(selectedLocation);
          toast({
            title: "Location selected",
            description: `Location set to: ${selectedLocation}`,
          });
        }}
        currentLocation={location}
      />
    </div>
  );
}