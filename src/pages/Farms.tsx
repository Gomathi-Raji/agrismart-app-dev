import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Leaf, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const NEARBY_FARMS = [
  { name: 'Chennai Organic Farm', distance: '2.3 km', type: 'Organic Vegetables', rating: 4.8 },
  { name: 'Poonamallee Organic Farm', distance: '3.1 km', type: 'Certified Organic', rating: 4.6 },
  { name: 'Guindy Experimental Farm', distance: '4.2 km', type: 'Research Farm', rating: 4.9 },
  { name: 'Poonamallee Rice Farm', distance: '5.1 km', type: 'Traditional Rice', rating: 4.4 },
  { name: 'Sunguvarchatram Rice Mills', distance: '6.3 km', type: 'Rice Processing', rating: 4.5 },
  { name: 'Thiruvallur Sugarcane Farm', distance: '8.7 km', type: 'Sugarcane', rating: 4.3 },
];

export default function Farms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🌾 Nearby Farms</h1>
          <p className="text-gray-600">Discover local farms and agricultural centers in your area</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Farms</p>
                  <p className="text-3xl font-bold text-green-600">25</p>
                </div>
                <Leaf className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Within 10km</p>
                  <p className="text-3xl font-bold text-blue-600">18</p>
                </div>
                <MapPin className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-3xl font-bold text-yellow-600">4.6</p>
                </div>
                <TrendingUp className="h-12 w-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Farms List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEARBY_FARMS.map((farm, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{farm.name}</span>
                  <Badge variant="secondary">⭐ {farm.rating}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{farm.distance} away</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Leaf className="h-4 w-4 mr-2" />
                    <span className="text-sm">{farm.type}</span>
                  </div>
                  <div className="pt-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                      Visit Farm
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