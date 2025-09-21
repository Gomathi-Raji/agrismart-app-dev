import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ShoppingBag, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const NEARBY_MARKETS = [
  { name: 'Koyambedu Market', distance: '1.8 km', type: 'Wholesale Market', timing: '4:00 AM - 2:00 PM', rating: 4.7 },
  { name: 'Poonamallee Weekly Market', distance: '2.5 km', type: 'Farmers Market', timing: '6:00 AM - 12:00 PM', rating: 4.5 },
  { name: 'Anna Nagar Farmers Market', distance: '3.2 km', type: 'Fresh Produce', timing: '5:00 AM - 10:00 AM', rating: 4.4 },
  { name: 'Guindy Organic Market', distance: '4.1 km', type: 'Organic Market', timing: '7:00 AM - 7:00 PM', rating: 4.8 },
  { name: 'Chromepet Vegetable Market', distance: '5.3 km', type: 'Local Market', timing: '5:30 AM - 11:00 AM', rating: 4.3 },
  { name: 'Thiruvallur Grain Market', distance: '7.8 km', type: 'Grain Trading', timing: '6:00 AM - 6:00 PM', rating: 4.6 },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🏪 Local Markets</h1>
          <p className="text-gray-600">Find the best agricultural markets and trading centers nearby</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Markets</p>
                  <p className="text-3xl font-bold text-red-600">15</p>
                </div>
                <ShoppingBag className="h-12 w-12 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Now</p>
                  <p className="text-3xl font-bold text-green-600">8</p>
                </div>
                <Clock className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-3xl font-bold text-yellow-600">4.5</p>
                </div>
                <TrendingUp className="h-12 w-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Markets List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEARBY_MARKETS.map((market, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{market.name}</span>
                  <Badge variant="secondary">⭐ {market.rating}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{market.distance} away</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    <span className="text-sm">{market.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{market.timing}</span>
                  </div>
                  <div className="pt-3">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                      Visit Market
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}